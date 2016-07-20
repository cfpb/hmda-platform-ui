FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y make && \
    apt-get install -y g++ && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm cache clean && \
    npm install && \
    npm run clean && \
    npm run dev:build

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
