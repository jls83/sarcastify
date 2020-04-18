FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY sarcastify.html /var/www/html/sarcastify.html
COPY app.js /var/www/js/app.js
COPY app.css /var/www/css/app.css

EXPOSE 80
