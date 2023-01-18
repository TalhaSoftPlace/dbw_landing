FROM node:18.4.0 as builder
# Set the working directory to /app inside the container
WORKDIR /
ARG DOCKER_ENV
# Copy app files
COPY . .

# install node modules and build assets
ENV REACT_APP_NODE_ENV=${DOCKER_ENV}
RUN echo $REACT_APP_NODE_ENV
RUN npm i gzipper -g && yarn install && yarn build:$REACT_APP_NODE_ENV

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
