FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

ARG dev=build

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
    # if the docker arg is set in compose `npm run build-docker` will be used (development)
    # otherwise `npm run build` will be used (production)
    npm run ${dev}

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
