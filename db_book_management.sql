-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2024 at 03:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_book_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_book`
--

CREATE TABLE `tbl_book` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `author` varchar(128) DEFAULT NULL,
  `thumbnail` varchar(128) DEFAULT NULL,
  `pdf` varchar(128) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `price` float NOT NULL,
  `tags` varchar(128) DEFAULT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_book`
--

INSERT INTO `tbl_book` (`id`, `user_id`, `name`, `title`, `author`, `thumbnail`, `pdf`, `pages`, `price`, `tags`, `token`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 2, 'Hobbit', 'The Hobbit', 'JBR Tolkin', '1716986779830_thumbnail_2.jpg', '1716986779844_books_forms.pdf', 36, 400, 'Amazing to read', 'VqammX3rNyThn6OdJIkcYSiZtJaLwJonAG4FJuWp', 1, 0, '2024-05-29 12:46:20', '2024-05-29 12:46:20'),
(2, 2, 'The Rules', 'Daughter of Man', 'Anthew', '1716986920482_thumbnail_3.jpg', '1716986920583_books_LAB11_BC042.pdf', 36, 300, 'Amazing to read', '7AUzu3HzrxmI6bH0ifRXqHKYh9dtdS9qInICm6FC', 1, 0, '2024-05-29 12:48:40', '2024-05-29 12:48:40'),
(3, 1, 'The Rules', 'Daughter of Man', 'Anthew', '1717066406192_thumbnail_2.jpg', '1717066406206_books_Ass 1,2 c++.pdf', 36, 1234, 'Amazing to read', 'rRo74jZMPPAWhvc57XjhUjTJzB8kuqpYjpbjXtO1', 1, 0, '2024-05-30 10:53:26', '2024-05-30 10:53:26'),
(4, 1, 'The Rules', 'holic', 'Anthew', '1717067726446_thumbnail_4.jpg', '1717067726543_books_BCA3_UNIT2_cpp.pdf', 40, 450, 'Amazing to read', 'scq4JyN4BrqzyJacJgcj7SjlTMM6Ip4Hrj1qIMRF', 1, 0, '2024-05-30 11:15:26', '2024-05-30 11:15:26'),
(5, 1, 'The Rules', 'Animal', 'Anthew', '1717067784031_thumbnail_5.jpg', '1717067784128_books_WAD-II (2).pdf', 40, 300, 'Amazing to read', 'B2PATNplRH8oAaxU2Cw9vgBGMhVIVvooGlWuXS11', 1, 0, '2024-05-30 11:16:24', '2024-05-30 11:16:24'),
(6, 1, 'The Rules', 'A', 'Anthew', '1717069185639_thumbnail_4.jpg', '1717069185921_books_WAD-II (2).pdf', 40, 399, 'Amazing to read', 'rLsIjBqFlg0V5HClToMCnzRiuqsAHA5Jl5SmlEiL', 1, 0, '2024-05-30 11:39:46', '2024-05-30 11:39:46'),
(7, 1, 'The Rules', 'A', 'Anthew', '1717069719298_thumbnail_3.jpg', '1717069719316_books_Chapter 10.pdf', 40, 300, 'Amazing to read', 'hDPvy3JQ2XkJj74kVSJBbigbiKZhaZ0TeqV0zppc', 1, 0, '2024-05-30 11:48:39', '2024-05-30 11:48:39');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `per_price` double(8,2) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`id`, `user_id`, `book_id`, `qty`, `per_price`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 7, 2, 3, 300.00, 1, 0, '2024-05-30 09:39:59', '2024-05-30 09:39:59'),
(2, 7, 2, 2, 300.00, 1, 0, '2024-05-30 09:40:25', '2024-05-30 09:40:25'),
(3, 7, 2, 1, 400.00, 1, 0, '2024-05-30 10:02:59', '2024-05-30 10:02:59'),
(4, 7, 2, 1, 300.00, 1, 0, '2024-05-30 10:04:58', '2024-05-30 10:04:58'),
(5, 7, 2, 1, 300.00, 1, 0, '2024-05-30 10:07:03', '2024-05-30 10:07:03'),
(6, 7, 2, 1, 300.00, 1, 0, '2024-05-30 10:11:59', '2024-05-30 10:11:59'),
(9, 2, 1, 1, 1234.00, 1, 0, '2024-05-30 11:20:38', '2024-05-30 11:20:38'),
(10, 2, 1, 4, 1234.00, 1, 0, '2024-05-30 11:40:27', '2024-05-30 11:40:27'),
(11, 2, 1, 3, 1234.00, 1, 0, '2024-05-30 11:46:22', '2024-05-30 11:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `id` bigint(20) NOT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `book_id` bigint(20) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `per_price` float DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `delivery_charge` float DEFAULT NULL,
  `status` enum('Pending','Accept','Reject') DEFAULT 'Pending',
  `is_active` tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `cart_id`, `user_id`, `book_id`, `qty`, `per_price`, `total_price`, `delivery_charge`, `status`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, 3, 300, 900, NULL, 'Pending', 1, 0, '2024-05-30 11:31:46', '2024-05-30 11:33:01'),
(2, 4, 2, 2, 1, 300, 300, NULL, 'Pending', 1, 0, '2024-05-30 11:31:56', '2024-05-30 11:33:06'),
(3, 4, 2, 2, 1, 300, 300, NULL, 'Pending', 1, 0, '2024-05-30 11:32:19', '2024-05-30 11:33:11'),
(4, 3, 2, 2, 1, 400, 400, NULL, 'Reject', 1, 0, '2024-05-30 11:34:29', '2024-05-30 13:13:18'),
(5, 1, 2, 2, 3, 300, 900, NULL, 'Pending', 1, 0, '2024-05-30 11:40:44', '2024-05-30 11:40:44'),
(6, 2, 2, 2, 2, 300, 600, NULL, 'Pending', 1, 0, '2024-05-30 11:41:33', '2024-05-30 11:41:33'),
(7, 3, 2, 2, 1, 400, 400, NULL, 'Pending', 1, 0, '2024-05-30 11:41:40', '2024-05-30 11:41:40'),
(8, 11, 2, 1, 3, 1234, 3702, NULL, 'Accept', 1, 0, '2024-05-30 11:46:30', '2024-05-30 13:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `country_code` varchar(8) DEFAULT '+91',
  `mobile` bigint(20) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `country_code`, `mobile`, `email`, `password`, `role`, `token`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Foram', '+81 Japa', 9106603720, 'pforam056@gmail.com', '11d5073209c6eb9a76f32a84087ade6a', 'admin', '26Ytli9iOvK2S43X4lXqFWdyGl6NBWwb9nu0BFWk', 1, 0, '2024-05-30 10:40:26', '2024-05-30 10:40:26'),
(2, 'Jayti Panchal', '+81 Japa', 9126603730, 'jayti@charusat.edu.in', '66314efd1f6523ae6d570430378448e4', 'user', 'VyC7MKaJdWEjSNiWDXab0yyuLPDqCBTrbqrhEY5M', 1, 0, '2024-05-30 11:20:27', '2024-05-30 11:20:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_book`
--
ALTER TABLE `tbl_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_book`
--
ALTER TABLE `tbl_book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `tbl_book` (`id`),
  ADD CONSTRAINT `tbl_order_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `tbl_cart` (`id`),
  ADD CONSTRAINT `tbl_order_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
