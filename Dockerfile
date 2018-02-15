FROM node:8-alpine

ADD package*.json /app/
ADD script.js /app/

RUN cd /app && npm install --silent
RUN chmod +x /app/script.js

ENTRYPOINT /app/script.js