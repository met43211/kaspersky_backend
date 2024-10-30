/*
  Warnings:

  - You are about to drop the `spin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "spin" DROP CONSTRAINT "spin_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "spin" DROP CONSTRAINT "spin_userId_fkey";

-- DropTable
DROP TABLE "spin";

-- CreateTable
CREATE TABLE "spins" (
    "id" SERIAL NOT NULL,
    "prizeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "spins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spins" ADD CONSTRAINT "spins_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "prizes"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spins" ADD CONSTRAINT "spins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
