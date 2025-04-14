default: up

bootstrap: 
	make install 
	cp .env.example .env
	make up
	docker compose exec backend npx prisma migrate deploy
	docker compose exec backend npm run seed:score

dev:
	npm run start:dev

up:
	docker compose up -d 

down:
	docker compose down --remove-orphans

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
	npm run seed:score

db-push:
	npx prisma db push

db-generate:
	npx prisma migrate dev --create-only

db-migrate:
	npx prisma migrate dev	

db-studio:
	npx prisma studio