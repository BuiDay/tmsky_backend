FROM node:18.12.1

WORKDIR /tmsky/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD ["npm","run","build"]