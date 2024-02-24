#!/bin/sh
cd apps/shell/.next && grep -rl "localhost:3001" . | xargs sed -i "s|localhost:3001|google.com|g"