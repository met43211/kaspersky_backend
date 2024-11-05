BEGIN;

-- 1. Создаем новый тип перечисления с новыми значениями
CREATE TYPE "PrizeTypes_new" AS ENUM ('security', 'mdr', 'edr', 'xdr');

-- 2. Изменяем столбец с использованием нового типа перечисления
ALTER TABLE "prizes" 
    ALTER COLUMN "type" TYPE "PrizeTypes_new" 
    USING (
        CASE "type"::text
            WHEN 'Security' THEN 'security'::text
            WHEN 'MDR' THEN 'mdr'::text
            WHEN 'EDR' THEN 'edr'::text
            WHEN 'XDR' THEN 'xdr'::text
        END::"PrizeTypes_new"
    );

-- 3. Удаляем старый тип
DROP TYPE "PrizeTypes" CASCADE;

-- 4. Переименовываем новый тип
ALTER TYPE "PrizeTypes_new" RENAME TO "PrizeTypes";

COMMIT;