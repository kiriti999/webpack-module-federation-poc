#!/bin/sh
echo "URL": $URL

# Store the current working directory in a variable
current_directory=$(pwd)

# Print the current working directory
echo "Current working directory is: $current_directory"

# Specify the JavaScript file
js_file_path="apps/shell/.next/static/ssr/remoteEntry.js"

# Use grep to find the line containing the URL
line=$(grep -A 2 '"home":' "apps/shell/.next/static/ssr/remoteEntry.js" | grep -oE '"(http|https)://[^"]*"')

# Use awk to extract the URL
current_url=$(echo "$line" | grep -Eo 'https?://[^ /]+' | head -1)

# Print the result
echo "Extracted URL is: $current_url"

find ./apps/shell/next.config.js -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/standalone/apps/shell/.next/server/webpack-runtime.js -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/server/webpack-runtime.js -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/static/chunks/pages -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/static/ssr/remoteEntry.js -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/standalone/apps/shell/.next/static/ssr/remoteEntry.js -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +
find ./apps/shell/.next/standalone/apps/shell/.next/static/chunks/pages -type f -exec sed -i "s|\\${current_url}|$URL|g" {} +

node apps/shell/.next/standalone/apps/shell/server.js


# info
# ====

# Search a string but exclude node_modules
# ========================================
# find . -type d -name 'node_modules' -prune -o -type f -exec grep -l 'http://127.0.0.1:3001' {} +

# Search a string and replace but exclude node_modules
# ====================================================
# find . -type d -name 'node_modules' -prune -o -type f -exec sed -i "s|\${BASE_URL}|$URL|g" {} +

# Path when copied from artifacts
# ===============================
# find standalone/apps/shell/server.js -type f -exec sed -i "s|\${$current_url}|$URL|g" {} +
# find standalone/apps/shell/.next/server/webpack-runtime.js -type f -exec sed -i "s|\${current_url}|$URL|g" {} +
# find next.config.js -type f -exec sed -i "s|\${current_url}|$URL|g" {} +
# node standalone/apps/shell/server.js

# Path when build from dockerfile
# ===============================
# find apps/shell -type d -name 'node_modules' -prune -o -type f -exec sed -i "s|\${current_url}|$URL|g" {} +
# find apps/shell \( -type d -name 'node_modules' -prune \) -o \( -type f -name 'package.json' -prune \) -o -type f -exec sed -i "s|\${current_url}|$URL|g" {} +

# These are the files found on grep
# =================================
# ./apps/shell/next.config.js
# ./apps/shell/.next/standalone/apps/shell/.next/server/webpack-runtime.js
# ./apps/shell/.next/server/webpack-runtime.js
# ./apps/shell/.next/static/chunks/pages/home-36b2fad4b2329048.js
# ./apps/shell/.next/static/ssr/remoteEntry.js
# ./apps/shell/.turbo/turbo-build.log
# ./apps/shell/.next/cache/webpack/server-production/2.pack
# ./apps/shell/.next/cache/webpack/server-production/1.pack
# ./apps/shell/.next/cache/webpack/server-production/index.pack
# ./apps/shell/.next/cache/webpack/server-production/index.pack.old
# ./apps/shell/.next/cache/webpack/client-production/0.pack
# ./apps/shell/.next/cache/webpack/client-production/index.pack