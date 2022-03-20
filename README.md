# backend-arch-docker-compose

## run instructions
docker-compose down && docker-compose build --no-cache && docker-compose up

## run instructions with scale
docker-compose down && docker-compose build --no-cache && docker-compose up --scale nodeserver=X

## create .env file
NODE_ENV=dev

MONGO_ROOT_USERNAME=XXX

MONGO_ROOT_PASSWORD=XXX

MONGO_URI=mongodb://XX:XXXXX@mongodb

DB_NAME=Book


