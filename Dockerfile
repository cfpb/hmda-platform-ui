FROM nginx:1.10
MAINTAINER Wyatt Pearsall<Wyatt.Pearsall@cfpb.gov>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
# COPY . /usr/src/app
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# RUN chown -R root /usr/src/app && chmod u+rwx /usr/src/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
