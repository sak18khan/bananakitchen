FROM nginx:alpine

# Copy static assets
COPY . /usr/share/nginx/html

# Default Cloud Run port
EXPOSE 8080

# Nginx configuration for Cloud Run
# We need to make sure Nginx listens on the port provided by Cloud Run ($PORT)
# A simple way for a static site is to use a custom nginx.conf or just use port 8080
RUN sed -i 's/listen \(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
