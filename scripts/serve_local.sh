#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required. Run ./scripts/setup_local.sh first."
  exit 1
fi

if ! brew list --versions ruby@3.3 >/dev/null 2>&1; then
  echo "Ruby 3.3 is not installed. Run ./scripts/setup_local.sh first."
  exit 1
fi
ruby_prefix="$(brew --prefix ruby@3.3)"

gem_bin="$($ruby_prefix/bin/ruby -rrubygems -e 'print Gem.bindir')"
export PATH="$ruby_prefix/bin:$gem_bin:$PATH"
export JEKYLL_ENV=development

exec bundle _2.7.2_ exec jekyll serve \
  --host localhost \
  --port 4000 \
  --livereload \
  --config _config.yml,_config_local.yml \
  "$@"
