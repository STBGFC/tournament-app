FROM nginx:stable
LABEL author="STBGFC <admin@stbgfc.co.uk>"

# build
COPY dist /opt/tournament-app
RUN chown -R nginx /opt/tournament-app && \
    rm -f /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/

# run
CMD sed -i 's/{{SERVER_NAME}}/$SERVER_NAME/g' /etc/nginx/conf.d/nginx.conf && nginx -g "daemon off;"

# expose
EXPOSE 80 443

