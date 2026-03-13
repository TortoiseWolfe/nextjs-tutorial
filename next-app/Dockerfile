# syntax=docker/dockerfile:1

# Stage 1: Base (production deps only)
FROM node:22-bookworm-slim AS base
USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci

# Stage 2: Dev (extends base with dev deps + dev server)
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
CMD ["npx", "next", "dev"]
