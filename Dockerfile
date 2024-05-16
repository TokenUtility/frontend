ARG NODE_VERSION=18.17.0
ARG PLATFORM="-alpine"

################## stage 1
FROM node:${NODE_VERSION}${PLATFORM} AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

################## stage 2
FROM node:${NODE_VERSION}${PLATFORM} AS builder
WORKDIR /app
COPY . ./

# COPY ./next.config-docker.js ./next.config.js
COPY --from=deps /app/node_modules ./node_modules
ENV PATH="./node_modules/.bin:$PATH"

RUN yarn buildindocker

################## stage 3
FROM node:${NODE_VERSION}${PLATFORM} as runner
WORKDIR /app
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}
ENV PORT ${NEXT_PORT}
# backup all files in the public folder to mount volume
ENTRYPOINT ["node", "server.js"]