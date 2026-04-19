CREATE TABLE `cases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`content` text NOT NULL,
	`imageUrl` varchar(500),
	`category` varchar(100),
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`language` enum('zh','en','ja') NOT NULL DEFAULT 'en',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdBy` int,
	CONSTRAINT `cases_id` PRIMARY KEY(`id`),
	CONSTRAINT `cases_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `clientLogos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`logoUrl` varchar(500) NOT NULL,
	`cloudinaryPublicId` varchar(255),
	`displayOrder` int NOT NULL DEFAULT 0,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdBy` int,
	CONSTRAINT `clientLogos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`cloudinaryPublicId` varchar(255) NOT NULL,
	`mimeType` varchar(100),
	`fileSize` int,
	`width` int,
	`height` int,
	`altText` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`uploadedBy` int,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
