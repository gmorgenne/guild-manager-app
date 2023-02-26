/*
  Warnings:

  - Added the required column `jobSpec` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "jobSpec" TEXT NOT NULL;
