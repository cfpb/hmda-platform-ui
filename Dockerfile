FROM hmda/hmda-ui-backend:latest

ENV NGINX_USER=svc_nginx_hmda

ADD ./dist /usr/src/app/dist

WORKDIR /usr/src/app

RUN adduser -D -g $NGINX_USER $NGINX_USER && \
    chown -R $NGINX_USER:$NGINX_USER dist/js/*.js /etc/nginx /run/nginx.pid /var/cache/nginx

USER $NGINX_USER

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
