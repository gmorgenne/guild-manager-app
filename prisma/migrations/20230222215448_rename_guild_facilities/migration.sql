/*
  Warnings:

  - You are about to drop the column `barracksLevel` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `messHallLevel` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "barracksLevel",
DROP COLUMN "messHallLevel",
ADD COLUMN     "guildArenaLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "guildHallLevel" INTEGER NOT NULL DEFAULT 0;
