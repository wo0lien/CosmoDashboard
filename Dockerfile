FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:18-alpine as production

COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
RUN npm i -p --ignore-scripts
COPY --from=build /app/build .

EXPOSE 3000
CMD ["node", "."]
