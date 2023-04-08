-- CreateTable
CREATE TABLE `Logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reqId` VARCHAR(191) NULL,
    `action` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `method` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `request` TEXT NULL,
    `response` TEXT NULL,
    `duration` VARCHAR(191) NULL,
    `props` TEXT NULL,
    `createdTs` INTEGER NULL,
    `updatedTs` INTEGER NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `Logs_reqId_idx`(`reqId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
