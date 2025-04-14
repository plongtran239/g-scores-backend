# G-Scores

**G-Scores** is a web application built with [Next.js](https://nextjs.org/). It is a web application for managing and tracking high school exam 2024 scores.

## 🚀 Tech Stack

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [nest-csv-parser](https://www.npmjs.com/package/nest-csv-parser)
- [Heroku](https://www.heroku.com/)

## ⚙️ Installation

You can set up the project in **two ways**:

### ✅ Option 1: Using `make`

```bash
make bootstrap
```

### ✅ Option 2: Manually

```bash
npm install
cp .env.example .env
docker compose up -d
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run seed:score
```

After that, backend will be available at [http://localhost:4000](http://localhost:4000)

## 📚 Documentation & Prisma Studio

You can access the documentation at [http://localhost:4000/documentation](http://localhost:4000/documentation)

You can start Prisma Studio by running:

```bash
docker compose exec backend npx prisma studio
```

After that, Prisma Studio will be available at [http://localhost:5555](http://localhost:5555)
