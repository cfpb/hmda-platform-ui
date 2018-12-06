FROM node:8.11.4-alpine as build-stage
WORKDIR /usr/src/app

# install build dependencies
COPY package.json yarn.lock .yarnrc ./
# install packages offline
COPY npm-packages-offline-cache ./npm-packages-offline-cache
RUN yarn install

# create react app needs src and public directories
COPY src ./src
COPY public ./public

RUN yarn build

FROM nginx:1.15.1-alpine
RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html/filing/2018
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]