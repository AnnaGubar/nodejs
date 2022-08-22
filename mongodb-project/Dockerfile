FROM node

WORKDIR /app
# создать папку

COPY . .
# из корнейвой в корневую
# аналог COPY . /app

RUN npm install
# установка модулей 

EXPOSE 3000
#  запуск через порт 3000

CMD ["node", "bin/server"]
# команда запуска node app