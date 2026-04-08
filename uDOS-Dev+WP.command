#!/bin/bash
# macOS: Docker WordPress stack + Host + ThinUI
set -e
cd "$(dirname "$0")"
exec node scripts/launch-with-wp.mjs --open "$@"
