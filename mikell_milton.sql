-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 19, 2025 at 05:06 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mikell_milton`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `line1` varchar(191) NOT NULL,
  `line2` varchar(191) DEFAULT NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) DEFAULT NULL,
  `postal_code` varchar(64) DEFAULT NULL,
  `country` varchar(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `checkout_orders`
--

CREATE TABLE `checkout_orders` (
  `id` bigint UNSIGNED NOT NULL,
  `paypal_order_id` varchar(64) NOT NULL,
  `draft_token` text NOT NULL,
  `status` enum('CREATED','CAPTURED','CANCELED','ERROR') NOT NULL DEFAULT 'CREATED',
  `currency` char(3) NOT NULL,
  `total_cents` int NOT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `items_json` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `checkout_orders`
--

INSERT INTO `checkout_orders` (`id`, `paypal_order_id`, `draft_token`, `status`, `currency`, `total_cents`, `customer_email`, `customer_name`, `items_json`, `created_at`, `updated_at`) VALUES
(1, '02B86310L1586293W', 'eyJpdGVtcyI6W3sic2t1IjoiRE9QRS1BQiIsInF1YW50aXR5IjoxfSx7InNrdSI6IkRPUEUtRUIiLCJxdWFudGl0eSI6MX1dLCJjb3Vwb24iOm51bGwsImlhdCI6MTc1ODI5ODQyMjQzOCwiZXhwIjoxNzU4MzAwMjIyNDM4fQ.2wQtpICGH2BAZGxvD0V93SzBdnaImirSTJ6eD-7DA4Q', 'CREATED', 'USD', 23000, 'adnankaka.786110@gmail.com', 'Adnan Rahim', '[{\"sku\":\"DOPE-AB\",\"quantity\":1},{\"sku\":\"DOPE-EB\",\"quantity\":1}]', '2025-09-19 16:13:54', '2025-09-19 16:13:54'),
(2, '13094254YA5950523', 'eyJpdGVtcyI6W3sic2t1IjoiRE9QRS1BQiIsInF1YW50aXR5IjoxfSx7InNrdSI6IkRPUEUtRUIiLCJxdWFudGl0eSI6MX1dLCJjb3Vwb24iOm51bGwsImlhdCI6MTc1ODI5ODQyMjQzOCwiZXhwIjoxNzU4MzAwMjIyNDM4fQ.2wQtpICGH2BAZGxvD0V93SzBdnaImirSTJ6eD-7DA4Q', 'CREATED', 'USD', 23000, 'adnankaka.786110@gmail.com', 'Adnan Rahim', '[{\"sku\":\"DOPE-AB\",\"quantity\":1},{\"sku\":\"DOPE-EB\",\"quantity\":1}]', '2025-09-19 16:14:14', '2025-09-19 16:14:14'),
(3, '636010866J412043P', 'eyJpdGVtcyI6W3sic2t1IjoiRE9QRS1BQiIsInF1YW50aXR5IjoxfSx7InNrdSI6IkRPUEUtRUIiLCJxdWFudGl0eSI6MX1dLCJjb3Vwb24iOm51bGwsImlhdCI6MTc1ODI5ODYyNDM5MCwiZXhwIjoxNzU4MzAwNDI0MzkwfQ.yWSvvaJb_EqBT_Iz46IpAVyc_eRXgKZKZmgzJ0rq5yA', 'CAPTURED', 'USD', 23000, 'adnankaka.786110@gmail.com', 'Adnan Rahim', '[{\"sku\":\"DOPE-AB\",\"quantity\":1},{\"sku\":\"DOPE-EB\",\"quantity\":1}]', '2025-09-19 16:17:24', '2025-09-19 16:17:34');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `code` varchar(64) NOT NULL,
  `type` enum('percent','fixed') NOT NULL,
  `value` int NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `max_uses` int DEFAULT NULL,
  `used_count` int NOT NULL DEFAULT '0',
  `valid_from` datetime DEFAULT NULL,
  `valid_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`code`, `type`, `value`, `active`, `max_uses`, `used_count`, `valid_from`, `valid_to`) VALUES
('DOPE10', 'percent', 10, 1, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `name`, `phone`) VALUES
(1, 'adnankaka.786110@gmail.com', 'Adnan Rahim', '03393151472'),
(3, 'buyer@example.com', 'Test Buyer', '');

-- --------------------------------------------------------

--
-- Table structure for table `downloads`
--

CREATE TABLE `downloads` (
  `id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `format` enum('ebook','audiobook') NOT NULL,
  `file_url` varchar(512) NOT NULL,
  `download_token` char(36) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `download_count` int NOT NULL DEFAULT '0',
  `max_downloads` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_submissions`
--

CREATE TABLE `form_submissions` (
  `id` bigint NOT NULL,
  `form_slug` varchar(64) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `payload` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `public_id` char(12) NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `billing_address_id` bigint DEFAULT NULL,
  `shipping_address_id` bigint DEFAULT NULL,
  `status` enum('created','pending','paid','failed','cancelled','fulfilled','refunded') NOT NULL DEFAULT 'created',
  `currency` char(3) NOT NULL DEFAULT 'USD',
  `subtotal_cents` int NOT NULL DEFAULT '0',
  `discount_cents` int NOT NULL DEFAULT '0',
  `shipping_cents` int NOT NULL DEFAULT '0',
  `tax_cents` int NOT NULL DEFAULT '0',
  `total_cents` int NOT NULL DEFAULT '0',
  `shipping_option` enum('digital','delivery','pickup') NOT NULL DEFAULT 'digital',
  `notes` text,
  `paypal_order_id` varchar(191) DEFAULT NULL,
  `paypal_capture_id` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `format` enum('ebook','audiobook','paperback') NOT NULL,
  `sku` varchar(64) DEFAULT NULL,
  `title_snapshot` varchar(191) NOT NULL,
  `unit_price_cents` int NOT NULL,
  `quantity` int NOT NULL,
  `line_total_cents` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `provider` enum('paypal') NOT NULL,
  `status` enum('created','approved','captured','failed','refunded') NOT NULL,
  `amount_cents` int NOT NULL,
  `currency` char(3) NOT NULL,
  `remote_id` varchar(191) NOT NULL,
  `raw_json` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `slug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image_path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `title`, `image_path`, `description`, `active`, `created_at`, `updated_at`) VALUES
(1, 'the-dope-breakthrough', 'The D.O.P.E Breakthrough', 'the-dope-breakthrough/cover.png', 'Official digital editions', 1, '2025-09-17 16:48:48', '2025-09-17 19:42:18');

-- --------------------------------------------------------

--
-- Table structure for table `product_formats`
--

CREATE TABLE `product_formats` (
  `id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `format` enum('ebook','audiobook','paperback') NOT NULL,
  `sku` varchar(64) DEFAULT NULL,
  `price_cents` int NOT NULL DEFAULT '0',
  `compare_at_cents` int DEFAULT NULL,
  `inventory` int DEFAULT NULL,
  `weight_g` int DEFAULT NULL,
  `is_digital` tinyint(1) NOT NULL DEFAULT '1',
  `image_path` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `file_url` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_formats`
--

INSERT INTO `product_formats` (`id`, `product_id`, `format`, `sku`, `price_cents`, `compare_at_cents`, `inventory`, `weight_g`, `is_digital`, `image_path`, `file_url`) VALUES
(1, 1, 'audiobook', 'DOPE-AB', 16500, NULL, NULL, NULL, 1, 'the-dope-breakthrough/ebAlbum.png', 'audiobooks/the-dope-breakthrough.zip'),
(2, 1, 'ebook', 'DOPE-EB', 6500, NULL, NULL, NULL, 1, 'the-dope-breakthrough/cover.png', 'ebooks/the-dope-breakthrough.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkout_orders`
--
ALTER TABLE `checkout_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paypal_order_id` (`paypal_order_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `downloads`
--
ALTER TABLE `downloads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `download_token` (`download_token`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `form_submissions`
--
ALTER TABLE `form_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `public_id` (`public_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `billing_address_id` (`billing_address_id`),
  ADD KEY `shipping_address_id` (`shipping_address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_remote_provider` (`remote_id`,`provider`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `product_formats`
--
ALTER TABLE `product_formats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkout_orders`
--
ALTER TABLE `checkout_orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `form_submissions`
--
ALTER TABLE `form_submissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_formats`
--
ALTER TABLE `product_formats`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `downloads`
--
ALTER TABLE `downloads`
  ADD CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `downloads_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`billing_address_id`) REFERENCES `addresses` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`shipping_address_id`) REFERENCES `addresses` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `product_formats`
--
ALTER TABLE `product_formats`
  ADD CONSTRAINT `product_formats_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
