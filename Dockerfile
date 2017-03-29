FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

RUN apt-get update && \
    apt-get install -y curl g++ git make && \
    curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y nodejs && \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# RUN chown -R root /usr/src/app && chmod u+rwx /usr/src/app
RUN npm install

EXPOSE 80

CMD ["./bootstrap.sh"]
