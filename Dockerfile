FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

ARG HMDA_API_PORT=4443

RUN apt-get update && \
    apt-get install -y curl && \
    apt-get install -y make && \
    apt-get install -y g++ && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN npm cache clean && \
    npm install && \
    npm run clean && \
    npm run build && \
    sed -i.bak s/{{HMDA_API_PORT}}/${HMDA_API_PORT}/ /etc/nginx/nginx.conf && \
    rm /etc/nginx/nginx.conf.bak && \
    echo "api port set to ${HMDA_API_PORT}"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
