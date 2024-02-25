#!/bin/sh
echo $1
echo $URL
# cd apps/shell/.next && grep -rl "localhost:3001" . | xargs sed -i "s|localhost:3001|$1|g" && node shell/server.js
find standalone/apps/shell/server.js -type f -exec sed -i "s|\${BASE_URL}|$URL|g" {} +
find standalone/apps/shell/.next/server/webpack-runtime.js -type f -exec sed -i "s|\${BASE_URL}|$URL|g" {} +
find next.config.js -type f -exec sed -i "s|\${BASE_URL}|$URL|g" {} +
node standalone/apps/shell/server.js
