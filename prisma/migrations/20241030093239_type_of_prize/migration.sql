/*
  Warnings:

  - Added the required column `type` to the `prizes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrizeTypes" AS ENUM ('Security', 'MDR', 'EDR', 'XDR');

-- AlterTable
ALTER TABLE "prizes" ADD COLUMN     "type" "PrizeTypes" NOT NULL;
