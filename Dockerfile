FROM node:20-alpine AS base

FROM base AS builder

COPY / /workspace
WORKDIR /workspace

RUN yum install FFmpeg
RUN yarn install

FROM base AS runner

WORKDIR /workspace

USER node

COPY --from=builder --chown=node:node /workspace/ ./

ENV TZ=Asia/Seoul
ENV NODE_ENV=production

VOLUME ["./logs"]

CMD ["yarn", "start"]
