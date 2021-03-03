#!/usr/local/bin/bash
set -PEeuo pipefail
shopt -s failglob inherit_errexit

zip dist.zip background.js icon*.png manifest.json
