FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>
ARG SKIP_JS_BUILD

RUN if [ -z ${SKIP_JS_BUILD+x} ]; then echo "Installing JS deps" && apt-get update && \
    apt-get install -y curl g++ git make && \
    curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y nodejs; fi && mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN if [ -z ${SKIP_JS_BUILD+x} ]; then echo "Building JS" && npm install; fi

EXPOSE 80

CMD ["./docker-entrypoint.sh"]
