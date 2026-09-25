#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required. Run ./scripts/setup_local.sh first."
  exit 1
fi

ruby_prefix="$(brew --prefix ruby@3.3)"
if [[ ! -x "$ruby_prefix/bin/ruby" ]]; then
  echo "Ruby 3.3 is not installed. Run ./scripts/setup_local.sh first."
  exit 1
fi

gem_bin="$($ruby_prefix/bin/ruby -rrubygems -e 'print Gem.bindir')"
export PATH="$ruby_prefix/bin:$gem_bin:$PATH"
export JEKYLL_ENV=development

exec bundle _2.7.2_ exec jekyll serve \
  --host 127.0.0.1 \
  --port 4000 \
  --livereload \
  --config _config.yml,_config_local.yml \
  "$@"
