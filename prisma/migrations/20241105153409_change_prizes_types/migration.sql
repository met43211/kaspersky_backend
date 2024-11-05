/*
  Warnings:

  - The values [Security,MDR,EDR,XDR] on the enum `PrizeTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PrizeTypes_new" AS ENUM ('security', 'mdr', 'edr', 'xdr');
ALTER TABLE "prizes" ALTER COLUMN "type" TYPE "PrizeTypes_new" USING ("type"::text::"PrizeTypes_new");
ALTER TYPE "PrizeTypes" RENAME TO "PrizeTypes_old";
ALTER TYPE "PrizeTypes_new" RENAME TO "PrizeTypes";
DROP TYPE "PrizeTypes_old";
COMMIT;
