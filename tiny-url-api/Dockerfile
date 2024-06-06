FROM node:18-alpine AS builder
USER node
WORKDIR /usr/src/app
COPY --chown=node . .
# Building the production-ready application code - alias to 'nest build'
RUN yarn install --production --frozen-lockfile && yarn build

FROM node:18-alpine
USER node
WORKDIR /usr/src/app
COPY --from=builder --chown=node /usr/src/app/node_modules ./node_modules
# Copying the production-ready application code, so it's one of few required artifacts
COPY --from=builder --chown=node /usr/src/app/dist ./dist
COPY --from=builder --chown=node /usr/src/app/package.json .
COPY --from=builder --chown=node /usr/src/app/.env .
# Expose the application port
EXPOSE 4000
CMD [ "node", "dist/main.js" ]
