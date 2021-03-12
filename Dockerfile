FROM nginx:alpine
# copy web app
COPY dist/ /app
# copy web app's nginx config file
COPY myapp.conf /etc/nginx/conf.d/
# remove default nginx conf file
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
