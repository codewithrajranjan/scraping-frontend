FROM node:9.2-alpine

user root

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

RUN npm install --quiet node-gyp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install gulp -g

COPY . .

EXPOSE 3000

ENTRYPOINT ["gulp"]

CMD ["serve"]
