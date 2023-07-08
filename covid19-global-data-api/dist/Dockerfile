# Use bullseye for glibc > 2.29
FROM node:16-bullseye AS build

# create app directory
WORKDIR /usr/app

# install dependencies
COPY package.json .
RUN npm install --omit=dev

FROM node:16-bullseye-slim
WORKDIR /usr/app
COPY --from=build /usr/app /usr/app
COPY config.json .
COPY index.js .
COPY result.json .
# Below files should be given manually, since they are not auto-generated from the `vulcan package` command
COPY profiles.yaml .
COPY WHO-COVID-19-global-data.csv .

ENV NODE_ENV production

CMD [ "node", "index.js" ]