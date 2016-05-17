FROM centos:7
MAINTAINER Andrew Wolfe <wolfe76@gmail.com>

RUN yum -y install epel-release
RUN yum -y install nginx

# Install npm
RUN curl --silent --location https://rpm.nodesource.com/setup | bash -
RUN yum -y install nodejs

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm cache clean; npm install
RUN npm run build

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]