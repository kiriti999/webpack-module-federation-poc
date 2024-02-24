#!/bin/sh
echo $1
cd apps/shell/.next && grep -rl "localhost:3001" . | xargs sed -i "s|localhost:3001|$1|g" && node shell/server.js