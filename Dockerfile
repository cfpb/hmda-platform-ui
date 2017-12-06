FROM centos:7

ENV NGINX_USER=svc_nginx_hmda

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN yum install -y epel-release && \
    yum-config-manager --enable cr && \
    yum update -y && \
    yum install -y nginx-1.12.2 && \
    yum clean all && \
    usermod -l $NGINX_USER nginx && \
    groupmod -n $NGINX_USER nginx && \
    rm -f nginx/*.rpm && \
    rm -rf /usr/share/nginx/ && \
    ls -d -1 /etc/nginx/* | grep -v '\/mime.types$' | xargs rm -rf && \
    mv nginx/* /etc/nginx && \
    ls -d -1 * | grep -v '^\(dist\|docker-entrypoint.sh\|env.sh\)$' | xargs rm -rf && \
    touch /run/nginx.pid && \
    chown -R $NGINX_USER:$NGINX_USER dist/js/app.min.js /etc/nginx /run/nginx.pid

USER $NGINX_USER

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
