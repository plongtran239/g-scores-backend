-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL,
    "math" DOUBLE PRECISION,
    "literature" DOUBLE PRECISION,
    "foreignLanguage" DOUBLE PRECISION,
    "physics" DOUBLE PRECISION,
    "chemistry" DOUBLE PRECISION,
    "biology" DOUBLE PRECISION,
    "history" DOUBLE PRECISION,
    "geography" DOUBLE PRECISION,
    "civics" DOUBLE PRECISION,
    "foreignLanguageCode" TEXT,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
