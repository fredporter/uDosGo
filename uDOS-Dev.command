#!/bin/bash
# Double-click in Finder to start Host + ThinUI (macOS).
set -e
cd "$(dirname "$0")"
exec node scripts/launch-dev.mjs --open "$@"
