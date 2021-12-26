-- AlterTable
ALTER TABLE `Note` ADD COLUMN `status` ENUM('draft', 'published') NOT NULL DEFAULT 'draft';
