FROM node:20-alpine

WORKDIR /app

# yarn.lock도 같이 복사해서 lockfile 기반 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn global add serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]
