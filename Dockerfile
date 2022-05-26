FROM node:lts-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN  npm install
COPY . .
RUN npm run build

FROM node:lts-alpine as final

WORKDIR /app
ADD package.json .
ADD nuxt.config.js .
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/static ./static
# COPY --from=builder /app  .

ENV HOST 0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000

CMD [ "npm", "start" ]