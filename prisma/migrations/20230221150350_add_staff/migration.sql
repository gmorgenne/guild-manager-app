-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sex" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "race" TEXT NOT NULL,
    "jobClass" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "contractCost" INTEGER NOT NULL DEFAULT 20,
    "contractDemand" INTEGER NOT NULL DEFAULT 20,
    "contractExpiration" TIMESTAMP(3) NOT NULL,
    "happiness" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;
