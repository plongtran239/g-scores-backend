default: up

bootstrap: 
	make install 
	cp .env.example .env
	make up

up:
	npm run start:dev

build:
	npm run build

format:
	npm run format

install:
	npm install

reinstall:
	rm -rf node_modules
	rm -rf package-lock.json
	make install

seed:
	npm run seed
	npm run seed:permission

db-push:
	npx prisma db push

db-generate:
	npx prisma migrate dev --create-only

db-migrate:
	npx prisma migrate dev	

db-studio:
	npx prisma studio