FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>
ARG SKIP_JS_BUILD

RUN if [ -z ${SKIP_JS_BUILD+x} ]; then echo "Installing JS deps" && apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ v0.27.5 main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn; fi && \
    mkdir -p /usr/src/app && \
    chown -R root /usr/src/app && chmod u+rwx /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY nginx /etc/nginx

RUN if [ -z ${SKIP_JS_BUILD+x} ]; then echo "Building JS" && yarn; fi

EXPOSE 80

CMD ["./docker-entrypoint.sh"]
