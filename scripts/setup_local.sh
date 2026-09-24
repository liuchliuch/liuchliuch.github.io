#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required. Install it from https://brew.sh and run this script again."
  exit 1
fi

if ! brew list --versions ruby@3.3 >/dev/null 2>&1; then
  brew install ruby@3.3
fi
ruby_prefix="$(brew --prefix ruby@3.3)"

gem_bin="$($ruby_prefix/bin/ruby -rrubygems -e 'print Gem.bindir')"
export PATH="$ruby_prefix/bin:$gem_bin:$PATH"

if ! gem list --installed --exact bundler --version 2.7.2 >/dev/null; then
  gem install bundler --version 2.7.2 --no-document
fi

bundle _2.7.2_ config set --local path vendor/bundle
bundle _2.7.2_ install

if ! command -v npm >/dev/null 2>&1; then
  brew install node
fi
npm install

echo "Local dependencies are ready. Run ./scripts/serve_local.sh to start the site."
