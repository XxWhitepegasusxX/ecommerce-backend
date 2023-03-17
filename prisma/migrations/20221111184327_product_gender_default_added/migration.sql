-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "gender" SET DEFAULT 'Unissex',
ALTER COLUMN "stock" SET DEFAULT 1,
ALTER COLUMN "installments" SET DEFAULT 0,
ALTER COLUMN "interest" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
