BEGIN;

-- Step 1: Create new enum type only if it doesn't already exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PrizeTypes_new') THEN
        CREATE TYPE "PrizeTypes_new" AS ENUM ('security', 'mdr', 'edr', 'xdr');
    END IF;
END $$;

-- Step 2: Alter the column to use the new enum type
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

-- Step 3: Drop the old type if it exists
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PrizeTypes') THEN
        DROP TYPE "PrizeTypes" CASCADE;
    END IF;
END $$;

-- Step 4: Rename the new type to "PrizeTypes"
ALTER TYPE "PrizeTypes_new" RENAME TO "PrizeTypes";

COMMIT;
