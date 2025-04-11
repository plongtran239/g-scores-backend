-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "math" DOUBLE PRECISION NOT NULL,
    "literature" DOUBLE PRECISION NOT NULL,
    "foreignLanguage" DOUBLE PRECISION NOT NULL,
    "physics" DOUBLE PRECISION NOT NULL,
    "chemistry" DOUBLE PRECISION NOT NULL,
    "biology" DOUBLE PRECISION NOT NULL,
    "history" DOUBLE PRECISION NOT NULL,
    "geography" DOUBLE PRECISION NOT NULL,
    "civics" DOUBLE PRECISION NOT NULL,
    "foreignLanguageCode" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);