#!/usr/bin/env ruby
# Generate static, searchable HTML renditions from the repository papers' LaTeX sources.
# The generated pages are committed, so GitHub Pages does not need LaTeXML at build time.

require "cgi"
require "json"
require "open3"
require "optparse"
require "pathname"
require "tmpdir"
require "yaml"

site_root = Pathname.new(__dir__).parent
options = {
  converter: ENV.fetch("LATEXML_OXIDE", "latexml_oxide"),
  source_root: site_root.parent.join("ai-paper-repo")
}

OptionParser.new do |parser|
  parser.banner = "Usage: ruby scripts/generate_repository_html.rb [options]"
  parser.on("--converter PATH", "Path to latexml_oxide") { |value| options[:converter] = value }
  parser.on("--source-root PATH", "Directory containing the LaTeX sources") do |value|
    options[:source_root] = Pathname.new(value)
  end
end.parse!

papers = YAML.load_file(site_root.join("_data/repository.yml")).fetch("papers")
sources = Dir.glob(options[:source_root].join("**/*.tex").to_s).map { |path| Pathname.new(path) }
raise "No LaTeX sources found in #{options[:source_root]}" if sources.empty?

slugs = papers.map { |paper| paper.fetch("slug") }
raise "Duplicate repository slugs" unless slugs.uniq.length == slugs.length

Dir.mktmpdir("repository-fulltext-") do |temporary_dir|
  papers.each_with_index do |paper, index|
    slug = paper.fetch("slug")
    raise "Invalid slug: #{slug}" unless slug.match?(/\A[a-z0-9]+(?:-[a-z0-9]+)*\z/)

    pdf = Pathname.new(paper.fetch("pdf"))
    raise "Missing PDF: #{pdf}" unless site_root.join(pdf.to_s.delete_prefix("/")).file?

    stem = pdf.basename(".pdf").to_s
    code = stem.split("-", 2).first
    matching_sources = sources.select { |source| source.basename(".tex").to_s == stem }
    if matching_sources.empty?
      matching_sources = sources.select do |source|
        name = source.basename(".tex").to_s
        name.start_with?("#{code}-") || name.include?("-#{code}-")
      end
    end
    raise "Expected one LaTeX source for #{code}; found #{matching_sources.length}" unless matching_sources.length == 1

    source = matching_sources.first
    paper_dir = Pathname.new(temporary_dir).join(code)
    paper_dir.mkpath
    raw_html = paper_dir.join("paper.html")
    log_path = paper_dir.join("conversion.log")
    command = [options[:converter], source.to_s, "--dest", raw_html.to_s,
               "--log", log_path.to_s, "--timeout", "120", "--quiet", "--noplane1"]
    _stdout, stderr, status = Open3.capture3(*command, chdir: source.dirname.to_s)
    raise "Conversion failed for #{code}: #{stderr.lines.last(10).join}" unless status.success? && raw_html.file?

    html = raw_html.read
    article = html.match(/<article\b[^>]*class="[^"]*\bltx_document\b[^"]*"[^>]*>.*?<\/article>/m)&.to_s
    raise "No article in #{code}" unless article
    raise "Missing abstract or references in #{code}" unless article.include?("ltx_abstract") && article.include?("ltx_bibliography")

    title_html = article.match(/<h1\b[^>]*class="[^"]*\bltx_title_document\b[^"]*"[^>]*>(.*?)<\/h1>/m)&.captures&.first
    raise "No document title in #{code}" unless title_html
    title_html = title_html.gsub(/\s+id="[^"]*"/, "")
    plain_title = CGI.unescapeHTML(title_html.gsub(/<br\b[^>]*\/?\s*>/i, " ").gsub(/<[^>]+>/, "").gsub(/\s+/, " ").strip)

    relative_links = article.scan(/(?:src|href)="([^"]+)"/).flatten.reject do |url|
      url.start_with?("#", "https://", "http://", "mailto:", "data:")
    end
    raise "Uncopied relative assets in #{code}: #{relative_links.uniq.join(', ')}" unless relative_links.empty?

    sections = article.scan(/<section id="([^"]+)" class="ltx_(section|subsection|subsubsection|appendix|bibliography)"[^>]*>\s*<h[2-4][^>]*>(.*?)<\/h[2-4]>/m)
    raise "No section headings in #{code}" if sections.empty?
    toc_items = sections.map do |id, level, heading|
      label = CGI.unescapeHTML(heading.gsub(/<[^>]+>/, "").gsub(/\s+/, " ").strip)
      %(<li class="repository-toc-#{level}"><a href="##{CGI.escapeHTML(id)}">#{CGI.escapeHTML(label)}</a></li>)
    end.join("\n")
    toc = <<~HTML
      <details class="repository-toc">
        <summary>Contents</summary>
        <nav aria-label="Paper contents"><ol>
      #{toc_items}
        </ol></nav>
      </details>
    HTML

    abstract = article.match(/<div[^>]*class="ltx_abstract"[^>]*>(.*?)<\/div>/m)&.captures&.first.to_s
    description = CGI.unescapeHTML(abstract.gsub(/<h6\b[^>]*>.*?<\/h6>/m, " ")
                                          .gsub(/<math\b.*?<\/math>/m) { |math| math.gsub(/<[^>]+>/, "") }
                                          .gsub(/<[^>]+>/, " ").gsub(/\s+/, " ").strip)[0, 220]
    description = description.sub(/\s+\S*\z/, "")
    front_matter = {
      "layout" => "repository-paper",
      "title" => plain_title,
      "repository_title_html" => title_html,
      "description" => description,
      "permalink" => "/repository/#{slug}/",
      "pdf" => paper.fetch("pdf"),
      "repository_added" => paper.fetch("added"),
      "repository_version" => 1,
      "repository_fulltext" => true,
      "profile_reveals" => false,
      "schema_type" => "ScholarlyArticle"
    }
    front_matter_text = front_matter.map { |key, value| "#{key}: #{JSON.generate(value)}" }.join("\n")
    target = site_root.join("_pages/repository/#{slug}.html")
    target.dirname.mkpath
    target.write("---\n#{front_matter_text}\n---\n\n#{toc}\n{% raw %}\n#{article}\n{% endraw %}\n")
    puts "#{index + 1}/#{papers.length} #{slug} (#{article.bytesize} bytes, #{sections.length} sections)"
  end
end
