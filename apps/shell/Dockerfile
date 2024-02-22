ARG NODE_VERSION=20
ARG ALPINE_VERSION=3.18
ARG ARTIFACTORY=docker.artifactory.ea.com

FROM ${ARTIFACTORY}/node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@8.6.10 --activate
# # Create the /pnpm directory and give ownership to the non-root user
RUN mkdir -p /pnpm && chown -R node:node /pnpm
RUN pnpm add pm2 -g

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY  --chown=nextjs:nodejs apps/help-center-shell/.next/standalone/ /app/
COPY  --chown=nextjs:nodejs apps/help-center-shell/.next/static /app/apps/help-center-shell/.next/static
COPY  --chown=nextjs:nodejs apps/help-center-shell/public /app/apps/help-center-shell/public
WORKDIR /app/apps/help-center-shell

USER nextjs

CMD ["pm2-runtime", "server.js"]
