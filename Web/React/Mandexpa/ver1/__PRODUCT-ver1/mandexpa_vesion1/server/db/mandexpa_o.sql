-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 17, 2018 at 10:30 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mandexpa`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
    `id` int(11) NOT NULL,
    `type` varchar(20) DEFAULT NULL,
    `firstname` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `lastname` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `email` varchar(200) DEFAULT NULL,
    `address` varchar(400) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `city` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `country_id` int(11) DEFAULT NULL,
    `states` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `zip` varchar(20) DEFAULT NULL,
    `telephone` varchar(15) DEFAULT NULL,
    `mobile` varchar(15) DEFAULT NULL,
    `lang` varchar(10) DEFAULT NULL,
    `cardholder` varchar(100) DEFAULT NULL,
    `created` datetime DEFAULT NULL,
    `birthday` datetime DEFAULT NULL,
    `state` tinyint(4) DEFAULT NULL,
    `username` varchar(100) DEFAULT NULL,
    `password` varchar(1000) DEFAULT NULL,
    `referral_id` int(11) DEFAULT NULL,
    `gender` varchar(11) DEFAULT NULL,
    `cgroup_id` int(11) DEFAULT NULL,
    `params` text DEFAULT NULL,
    `company` varchar(400) DEFAULT NULL,
    `image` varchar(200) DEFAULT NULL,
    `about` text DEFAULT NULL,
    `verifymobile` int(11) DEFAULT NULL,
    `phonecode` varchar(10) DEFAULT NULL,
    `activation` varchar(10) DEFAULT NULL,
    `ratings` varchar(20) DEFAULT NULL,
    `coverphoto` varchar(200) DEFAULT NULL,
    `cards` text DEFAULT NULL,
    `bank_code` varchar(100) DEFAULT NULL,
    `account_no` varchar(100) DEFAULT NULL,
    `holder` varchar(100) DEFAULT NULL,
    `bank_name` varchar(100) DEFAULT NULL,
    `fbtoken` varchar(200) DEFAULT NULL,
    `fax` varchar(100) DEFAULT NULL,
    `name_account` varchar(200) DEFAULT NULL,
    `number_agents` int DEFAULT NULL,
    `reason_social` varchar(200) DEFAULT NULL,
    `postalcode` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `account` ADD `color` VARCHAR(100) NULL DEFAULT NULL AFTER `fbtoken`;
ALTER TABLE `account` ADD `logo` text NULL DEFAULT NULL AFTER `fbtoken`;
ALTER TABLE `account` ADD COLUMN `created_by` INT NULL DEFAULT NULL AFTER `postalcode`;
ALTER TABLE `account` ADD `number_account_child` INT NULL DEFAULT '0' AFTER `created_by`;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `type`, `firstname`, `lastname`, `email`, `address`, `city`, `country_id`, `states`, `zip`, `telephone`, `mobile`, `lang`, `cardholder`, `created`, `birthday`, `state`, `username`, `password`, `referral_id`, `gender`, `cgroup_id`, `params`, `company`, `image`, `about`, `verifymobile`, `phonecode`, `activation`, `ratings`, `coverphoto`, `cards`, `bank_code`, `account_no`, `holder`, `bank_name`, `fbtoken`) VALUES
(1, 'admin', 'Super', 'Admin', 'quan@joombooking.com', '', '', 0, '', '', '', '', '', NULL, NULL, '1992-10-10 00:00:00', 1, 'admin', '$2a$10$Do5S/hD6cKQwXl1u0FEpA.SmwVYU9naSvmqScncLrNF4BMzV8PQYa', NULL, NULL, NULL, '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------



--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `contact_id` int(4) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` int(255) DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `metadesc` varchar(250) NOT NULL,
  `created` datetime NOT NULL,
  `featured` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `type`, `parent_id`, `title`, `alias`, `image`, `description`, `state`, `metadesc`, `created`, `featured`) VALUES
(1, 'package', 0, 'Root', 'root', '', '', 1, '', '0000-00-00 00:00:00', 0),
(101, 'package', 1, 'Fitness & Weight Loss', 'fitness-weight-loss', 'images/WeightManagementRetreats.jpg', '<p>Search hiking, boot camps &amp; weight loss retreats</p>', 1, '', '2015-07-24 06:09:08', 0),
(102, 'package', 1, 'Detox & Cleansing', 'detox-cleansing', 'images/DetoxCleansingRetreats.jpg', '<p>Search detox, cleansing &amp; juice fasting retreats</p>', 1, '', '2015-06-23 08:43:52', 0),
(103, 'package', 1, 'Pampering Spa', 'pampering-spa', 'images/PamperingSpaRetreats.jpg', '<p>Search beauty spa &amp; pampering retreats</p>', 1, '', '2015-06-23 08:44:05', 1),
(104, 'package', 1, 'Yogi''s', 'yogi-s', 'images/YogiesRetreats.jpg', '<p>Search Yoga &amp; Pilates retreats</p>', 1, '', '2015-07-16 01:35:20', 1),
(105, 'package', 1, 'Personal Development', 'personal-development', 'images/PersonalDevelopmentRetreats.jpg', '<p>Search life coaching &amp; counseling retreats </p>', 1, '', '2015-06-22 01:06:25', 1),
(106, 'package', 1, 'Wellbeing', 'wellbeing', 'images/Wellbeingretreats.jpg', '<p>Search beginner and all-rounder retreats</p>', 1, '', '2015-07-21 01:28:47', 1),
(107, 'package', 1, 'Stress Management', 'stress-management', 'images/StressManagementRetreats.jpg', '<p>Search stress relief, fatigue &amp; burnout retreats</p>', 1, '', '2015-06-22 01:08:39', 0),
(108, 'package', 1, 'Healing & Recovery', 'healing-recovery', 'images/Ayruveda.jpg', '<p>Search ayurveda, recovery &amp; healing retreats</p>', 1, '', '2015-06-22 02:11:06', 1),
(109, 'package', 1, 'Meditation', 'meditation', 'images/MeditationRetreats.jpg', '<p>Search mindful meditation &amp; silent retreats</p>', 1, '', '2015-07-21 02:31:47', 1),
(112, 'hotel', 1, 'Ancient', 'ancient', '', '', 1, '', '2015-07-24 06:57:04', 1),
(113, 'hotel', 1, 'Modern', 'modern', '', '', 1, '', '2015-07-24 06:57:23', 1);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL,
  `path` varchar(200) NOT NULL,
  `access` tinyint(4) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `value` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `images` tinytext NOT NULL,
  `country_id` int(11) NOT NULL,
  `alias` varchar(200) NOT NULL,
  `ordering` int(11) NOT NULL,
  `code` varchar(4) DEFAULT NULL,
  `state` tinyint(11) NOT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `state_id` smallint(6) DEFAULT NULL,
  `desc` text,
  `metakey` tinytext,
  `metadesc` mediumtext,
  `province` tinyint(4) DEFAULT NULL,
  `air` tinyint(4) DEFAULT NULL,
  `bus` tinyint(4) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `intro` text NOT NULL,
  `params` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `lft`, `rgt`, `path`, `access`, `parent_id`, `title`, `value`, `image`, `images`, `country_id`, `alias`, `ordering`, `code`, `state`, `longitude`, `latitude`, `state_id`, `desc`, `metakey`, `metadesc`, `province`, `air`, `bus`, `level`, `intro`, `params`) VALUES
(1, 0, 17, '', 0, 0, 'Root', '', '', '', 0, 'root', 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', ''),
(487, 1, 2, 'sapa', 1, 1, 'Sapa', '', 'images/photo/vietnam/sapa.jpg', '', 230, 'sapa', 7, 'SAP', 1, 4.88885, 50.7782, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(496, 3, 4, 'hanoi', 1, 1, 'Hanoi', '', 'images/photo/vietnam/hanoi.jpg', '', 230, 'hanoi', 11, 'HAN', 1, 105.834, 21.0278, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(504, 5, 6, '', 1, 1, 'Bangkok', '', 'images/photo/thailand/BKKWatPhraKheo.jpg', '', 210, 'bangkok', 18, 'BAK', 1, 100.502, 13.7563, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(505, 7, 8, '', 1, 1, 'Chiang Mai', '', 'images/photo/thailand/chiang-mai.jpg', '', 210, 'chiang-mai', 17, 'CHM', 1, 100.5, 13.735, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(508, 9, 10, 'ho-chi-minh', 1, 1, 'Ho Chi Minh', '', '', '', 230, 'ho-chi-minh', 12, 'HCM', 1, 106.631, 10.8197, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(509, 11, 12, 'halong-bay', 1, 1, 'Halong Bay', '', 'images/photo/vietnam/halong2.jpg', '', 230, 'halong-bay', 9, 'HLB', 1, 107.148, 20.9393, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(511, 13, 14, '', 1, 1, 'Ninh Binh', '', 'images/photo/vietnam/baidinh1.jpg', '', 230, 'ninh-binh', 20, 'NB', 1, 105.971, 20.2602, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', ''),
(512, 15, 16, '', 1, 1, 'Noi Bai airport', '', '', '', 230, 'noi-bai-airport', 0, '', 1, 105.804, 21.2187, NULL, '', NULL, NULL, NULL, NULL, NULL, 1, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `firstname` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `address` varchar(400) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `states` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `lang` varchar(10) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `billing_address` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `referral_id` int(11) DEFAULT NULL,
  `gender` varchar(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `params` text DEFAULT NULL,
  `company` varchar(400) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `verifymobile` int(11) DEFAULT NULL,
  `phonecode` varchar(10) DEFAULT NULL,
  `activation` varchar(10) DEFAULT NULL,
  `ratings` varchar(20) DEFAULT NULL,
  `coverphoto` varchar(200)DEFAULT NULL,
  `fbtoken` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

ALTER TABLE `mandexpa`.`contact`
ADD COLUMN `streetname` VARCHAR(45) NULL DEFAULT NULL AFTER `fbtoken`,
ADD COLUMN `streetnumber` VARCHAR(45) NULL DEFAULT NULL AFTER `streetname`,
ADD COLUMN `title` VARCHAR(45) NULL DEFAULT NULL AFTER `streetnumber`,
ADD COLUMN `typecontact` VARCHAR(45) NULL DEFAULT NULL AFTER `title`,
ADD COLUMN `type` VARCHAR(45) NULL DEFAULT NULL AFTER `typecontact`,
ADD COLUMN `unit` VARCHAR(45) NULL DEFAULT NULL AFTER `type`;
ALTER TABLE `mandexpa`.`contact`
ADD COLUMN `zipcode` VARCHAR(45) NULL DEFAULT NULL AFTER `unit`;
ALTER TABLE `mandexpa`.`contact`
ADD COLUMN `create_account_id` INT(11) NULL DEFAULT NULL AFTER `zipcode`;
ALTER TABLE `mandexpa`.`contact`
ADD COLUMN `source_prospect` VARCHAR(45) NULL DEFAULT NULL AFTER `create_account_id`;


--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `account_id`, `firstname`, `lastname`, `email`, `address`, `city`, `country_id`, `states`, `zip`, `telephone`, `mobile`, `lang`, `created`, `billing_address`, `birthday`, `state`, `referral_id`, `gender`, `group_id`, `params`, `company`, `image`, `about`, `verifymobile`, `phonecode`, `activation`, `ratings`, `coverphoto`, `fbtoken`) VALUES
(150, 900, 'hien', 'nguyen', 'hien@joombooking.com', 'donganh, hanoi', 'hanoi', 230, '', '1000', '09876543212', '', '', '2018-01-24 07:46:00', '', '1980-01-01 00:00:00', 0, NULL, '0', NULL, '[]', '', 'images/users/avatar-1433366034.jpg', 'sadasasa', 0, '', '', '4.5000', '', ''),
(151, 902, 'Ngo', 'Quan', 'quan@12trip.vn', '18 Tam Trinh, Hai ba Trung Ha Noi', 'Hanoi', 230, '', '1000', '0912348149', '0912348149', '', '2018-01-27 03:43:33', '', '1991-06-05 00:00:00', 0, NULL, 'F', NULL, '[]', '', 'images/driver.jpg', 'Kim Jong-un lần đầu bước qua giới tuyến quân sự hai miền, bắt tay và bước vào phòng hội đàm cùng Tổng thống Hàn Quốc tại làng đình chiến Panmunjom, bên trong Khu Phi quân sự liên Triều.', 0, '84', 'verified', '', 'images/users/151/cover_151.png', ''),
(159, 904, 'Hien', 'Nguyen', 'hien@joombooking.com', 'asas', '', 4, '', '', '', '342342', '', '2018-02-09 07:11:13', '', '1979-02-23 00:00:00', 0, NULL, 'M', NULL, '[]', '', 'images/joomla_black.png', '                        ', 0, '4', 'verified', '5.0000', '', ''),
(160, 905, 'Admin', 'Hoang', 'admin@gmail.com', '', '', 0, '', '', '', '', '', '2018-03-09 15:37:59', '', '0000-00-00 00:00:00', 0, NULL, NULL, NULL, '[]', '', '', '', 0, '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `code` varchar(2) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `state` varchar(45) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `region_id` varchar(45) DEFAULT NULL,
  `flag` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL,
  `params` text,
  `phone_code` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `code`, `name`, `state`, `content`, `region_id`, `flag`, `ordering`, `params`, `phone_code`) VALUES
(1, '中国', ' CHINA', '1', '', NULL, '', 180, NULL, ''),
(2, 'CA', 'Canada', '1', '', NULL, '', 3, NULL, ''),
(3, 'AF', 'Afghanistan', '1', '', '13', '', 164, NULL, ''),
(4, 'AL', 'Albania', '1', '', NULL, '', 163, NULL, '34'),
(5, 'DZ', 'Algeria', '1', NULL, NULL, '', 162, NULL, ''),
(6, 'DS', 'American Samoa', '1', NULL, NULL, '', 161, NULL, ''),
(7, 'AD', 'Andorra', '1', NULL, NULL, '', 160, NULL, ''),
(8, 'AO', 'Angola', '1', NULL, NULL, '', 159, NULL, ''),
(9, 'AI', 'Anguilla', '1', NULL, NULL, '', 158, NULL, ''),
(10, 'AQ', 'Antarctica', '1', NULL, NULL, '', 157, NULL, ''),
(11, 'AG', 'Antigua and/or Barbuda', '1', NULL, NULL, '', 156, NULL, ''),
(12, 'AR', 'Argentina', '1', NULL, NULL, '', 155, NULL, ''),
(13, 'AM', 'Armenia', '1', NULL, NULL, '', 154, NULL, ''),
(14, 'AW', 'Aruba', '1', NULL, NULL, '', 153, NULL, ''),
(15, 'AU', 'Australia', '1', NULL, NULL, '', 165, NULL, ''),
(16, 'AT', 'Austria', '1', NULL, NULL, '', 166, NULL, ''),
(17, 'AZ', 'Azerbaijan', '1', NULL, NULL, '', 167, NULL, ''),
(18, 'BS', 'Bahamas', '1', NULL, NULL, '', 179, NULL, ''),
(19, 'BH', 'Bahrain', '1', NULL, NULL, '', 178, NULL, ''),
(20, 'BD', 'Bangladesh', '1', NULL, NULL, '', 177, NULL, ''),
(21, 'BB', 'Barbados', '1', NULL, NULL, '', 176, NULL, ''),
(22, 'BY', 'Belarus', '1', NULL, NULL, '', 175, NULL, ''),
(23, 'BE', 'Belgium', '1', NULL, NULL, '', 174, NULL, ''),
(24, 'BZ', 'Belize', '1', NULL, NULL, '', 173, NULL, ''),
(25, 'BJ', 'Benin', '1', NULL, NULL, '', 172, NULL, ''),
(26, 'BM', 'Bermuda', '1', NULL, NULL, '', 171, NULL, ''),
(27, 'BT', 'Bhutan', '1', NULL, NULL, '', 170, NULL, ''),
(28, 'BO', 'Bolivia', '1', NULL, NULL, '', 169, NULL, ''),
(29, 'BA', 'Bosnia and Herzegovina', '1', NULL, NULL, '', 168, NULL, ''),
(30, 'BW', 'Botswana', '1', NULL, NULL, '', 152, NULL, ''),
(31, 'BV', 'Bouvet Island', '1', NULL, NULL, '', 151, NULL, ''),
(32, 'BR', 'Brazil', '1', NULL, NULL, '', 150, NULL, ''),
(33, 'IO', 'British lndian Ocean Territory', '1', NULL, NULL, '', 134, NULL, ''),
(34, 'BN', 'Brunei Darussalam', '1', NULL, NULL, '', 133, NULL, ''),
(35, 'BG', 'Bulgaria', '1', NULL, NULL, '', 132, NULL, ''),
(36, 'BF', 'Burkina Faso', '1', NULL, NULL, '', 131, NULL, ''),
(37, 'BI', 'Burundi', '1', NULL, NULL, '', 130, NULL, ''),
(38, 'KH', 'Cambodia', '1', NULL, NULL, '', 129, NULL, ''),
(39, 'CM', 'Cameroon', '1', NULL, NULL, '', 128, NULL, ''),
(40, 'CV', 'Cape Verde', '1', NULL, NULL, '', 127, NULL, ''),
(41, 'KY', 'Cayman Islands', '1', NULL, NULL, '', 126, NULL, ''),
(42, 'CF', 'Central African Republic', '1', NULL, NULL, '', 125, NULL, ''),
(43, 'TD', 'Chad', '1', NULL, NULL, '', 124, NULL, ''),
(44, 'CL', 'Chile', '1', NULL, NULL, '', 123, NULL, ''),
(45, 'CN', 'China', '1', '', NULL, '', 135, NULL, ''),
(46, 'CX', 'Christmas Island', '1', NULL, NULL, '', 136, NULL, ''),
(47, 'CC', 'Cocos (Keeling) Islands', '1', NULL, NULL, '', 137, NULL, ''),
(48, 'CO', 'Colombia', '1', NULL, NULL, '', 149, NULL, ''),
(49, 'KM', 'Comoros', '1', NULL, NULL, '', 148, NULL, ''),
(50, 'CG', 'Congo', '1', NULL, NULL, '', 147, NULL, ''),
(51, 'CK', 'Cook Islands', '1', NULL, NULL, '', 146, NULL, ''),
(52, 'CR', 'Costa Rica', '1', NULL, NULL, '', 145, NULL, ''),
(53, 'HR', 'Croatia (Hrvatska)', '1', '', NULL, '', 144, NULL, ''),
(54, 'CU', 'Cuba', '1', NULL, NULL, '', 143, NULL, ''),
(55, 'CY', 'Cyprus', '1', NULL, NULL, '', 142, NULL, ''),
(56, 'CZ', 'Czech Republic', '1', NULL, NULL, '', 141, NULL, ''),
(57, 'DK', 'Denmark', '1', NULL, NULL, '', 140, NULL, ''),
(58, 'DJ', 'Djibouti', '1', NULL, NULL, '', 139, NULL, ''),
(59, 'DM', 'Dominica', '1', NULL, NULL, '', 138, NULL, ''),
(60, 'DO', 'Dominican Republic', '1', NULL, NULL, '', 122, NULL, ''),
(61, 'TP', 'East Timor', '1', NULL, NULL, '', 181, NULL, ''),
(62, 'EC', 'Ecudaor', '1', NULL, NULL, '', 240, NULL, ''),
(63, 'EG', 'Egypt', '1', NULL, NULL, '', 224, NULL, ''),
(64, 'SV', 'El Salvador', '1', NULL, NULL, '', 223, NULL, ''),
(65, 'GQ', 'Equatorial Guinea', '1', NULL, NULL, '', 222, NULL, ''),
(66, 'ER', 'Eritrea', '1', NULL, NULL, '', 221, NULL, ''),
(67, 'EE', 'Estonia', '1', NULL, NULL, '', 220, NULL, ''),
(68, 'ET', 'Ethiopia', '1', '', NULL, '', 219, NULL, ''),
(69, 'FK', 'Falkland Islands (Malvinas)', '1', NULL, NULL, '', 218, NULL, ''),
(70, 'FO', 'Faroe Islands', '1', NULL, NULL, '', 217, NULL, ''),
(71, 'FJ', 'Fiji', '1', NULL, NULL, '', 216, NULL, ''),
(72, 'FI', 'Finland', '1', NULL, NULL, '', 215, NULL, ''),
(73, 'FR', 'France', '1', NULL, NULL, '', 214, NULL, ''),
(74, 'FX', 'France, Metropolitan', '1', NULL, NULL, '', 213, NULL, ''),
(75, 'GF', 'French Guiana', '1', NULL, NULL, '', 225, NULL, ''),
(76, 'PF', 'French Polynesia', '1', NULL, NULL, '', 226, NULL, ''),
(77, 'TF', 'French Southern Territories', '1', NULL, NULL, '', 227, NULL, ''),
(78, 'GA', 'Gabon', '1', NULL, NULL, '', 239, NULL, ''),
(79, 'GM', 'Gambia', '1', NULL, NULL, '', 238, NULL, ''),
(80, 'GE', 'Georgia', '1', NULL, NULL, '', 237, NULL, ''),
(81, 'DE', 'Germany', '1', NULL, NULL, '', 236, NULL, ''),
(82, 'GH', 'Ghana', '1', NULL, NULL, '', 235, NULL, ''),
(83, 'GI', 'Gibraltar', '1', NULL, NULL, '', 234, NULL, ''),
(84, 'GR', 'Greece', '1', NULL, NULL, '', 233, NULL, ''),
(85, 'GL', 'Greenland', '1', NULL, NULL, '', 232, NULL, ''),
(86, 'GD', 'Grenada', '1', NULL, NULL, '', 231, NULL, ''),
(87, 'GP', 'Guadeloupe', '1', NULL, NULL, '', 230, NULL, ''),
(88, 'GU', 'Guam', '1', NULL, NULL, '', 229, NULL, ''),
(89, 'GT', 'Guatemala', '1', '', NULL, '', 228, NULL, ''),
(90, 'GN', 'Guinea', '1', NULL, NULL, '', 212, NULL, ''),
(91, 'GW', 'Guinea-Bissau', '1', NULL, NULL, '', 211, NULL, ''),
(92, 'GY', 'Guyana', '1', NULL, NULL, '', 210, NULL, ''),
(93, 'HT', 'Haiti', '1', NULL, NULL, '', 194, NULL, ''),
(94, 'HM', 'Heard and Mc Donald Islands', '1', NULL, NULL, '', 193, NULL, ''),
(95, 'HN', 'Honduras', '1', NULL, NULL, '', 192, NULL, ''),
(96, 'HK', 'Hong Kong', '1', NULL, NULL, '', 191, NULL, ''),
(97, 'HU', 'Hungary', '1', NULL, NULL, '', 190, NULL, ''),
(98, 'IS', 'Iceland', '1', NULL, NULL, '', 189, NULL, ''),
(99, 'IN', 'India', '1', NULL, NULL, '', 188, NULL, ''),
(100, 'ID', 'Indonesia', '1', NULL, NULL, '', 187, NULL, ''),
(101, 'IR', 'Iran (Islamic Republic of)', '1', NULL, NULL, '', 186, NULL, ''),
(102, 'IQ', 'Iraq', '1', NULL, NULL, '', 185, NULL, ''),
(103, 'IE', 'Ireland', '1', NULL, NULL, '', 184, NULL, ''),
(104, 'IL', 'Israel', '1', NULL, NULL, '', 183, NULL, ''),
(105, 'IT', 'Italy', '1', NULL, NULL, '', 195, NULL, ''),
(106, 'CI', 'Ivory Coast', '1', NULL, NULL, '', 196, NULL, ''),
(107, 'JM', 'Jamaica', '1', NULL, NULL, '', 197, NULL, ''),
(108, 'JP', 'Japan', '1', NULL, NULL, '', 209, NULL, ''),
(109, 'JO', 'Jordan', '1', NULL, NULL, '', 208, NULL, ''),
(110, 'KZ', 'Kazakhstan', '1', NULL, NULL, '', 207, NULL, ''),
(111, 'KE', 'Kenya', '1', NULL, NULL, '', 206, NULL, ''),
(112, 'KI', 'Kiribati', '1', NULL, NULL, '', 205, NULL, ''),
(113, 'KP', 'Korea, Democratic People''s Republic of', '1', NULL, NULL, '', 204, NULL, ''),
(114, 'KR', 'Korea, Republic of', '1', NULL, NULL, '', 203, NULL, ''),
(115, 'KW', 'Kuwait', '1', NULL, NULL, '', 202, NULL, ''),
(116, 'KG', 'Kyrgyzstan', '1', NULL, NULL, '', 201, NULL, ''),
(117, 'LA', 'Lao People''s Democratic Republic', '1', NULL, NULL, '', 200, NULL, ''),
(118, 'LV', 'Latvia', '1', NULL, NULL, '', 199, NULL, ''),
(119, 'LB', 'Lebanon', '1', NULL, NULL, '', 198, NULL, ''),
(120, 'LS', 'Lesotho', '1', NULL, NULL, '', 182, NULL, ''),
(121, 'LR', 'Liberia', '1', NULL, NULL, '', 61, NULL, ''),
(122, 'LY', 'Libyan Arab Jamahiriya', '1', NULL, NULL, '', 45, NULL, ''),
(123, 'LI', 'Liechtenstein', '1', NULL, NULL, '', 44, NULL, ''),
(124, 'LT', 'Lithuania', '1', NULL, NULL, '', 43, NULL, ''),
(125, 'LU', 'Luxembourg', '1', NULL, NULL, '', 42, NULL, ''),
(126, 'MO', 'Macau', '1', NULL, NULL, '', 41, NULL, ''),
(127, 'MK', 'Macedonia', '1', NULL, NULL, '', 40, NULL, ''),
(128, 'MG', 'Madagascar', '1', NULL, NULL, '', 39, NULL, ''),
(129, 'MW', 'Malawi', '1', NULL, NULL, '', 38, NULL, ''),
(130, 'MY', 'Malaysia', '1', NULL, NULL, '', 37, NULL, ''),
(131, 'MV', 'Maldives', '1', NULL, NULL, '', 36, NULL, ''),
(132, 'ML', 'Mali', '1', NULL, NULL, '', 35, NULL, ''),
(133, 'MT', 'Malta', '1', NULL, NULL, '', 34, NULL, ''),
(134, 'MH', 'Marshall Islands', '1', NULL, NULL, '', 46, NULL, ''),
(135, 'MQ', 'Martinique', '1', NULL, NULL, '', 47, NULL, ''),
(136, 'MR', 'Mauritania', '1', NULL, NULL, '', 48, NULL, ''),
(137, 'MU', 'Mauritius', '1', NULL, NULL, '', 60, NULL, ''),
(138, 'TY', 'Mayotte', '1', NULL, NULL, '', 59, NULL, ''),
(139, 'MX', 'Mexico', '1', NULL, NULL, '', 58, NULL, ''),
(140, 'FM', 'Micronesia, Federated States of', '1', NULL, NULL, '', 57, NULL, ''),
(141, 'MD', 'Moldova, Republic of', '1', NULL, NULL, '', 56, NULL, ''),
(142, 'MC', 'Monaco', '1', NULL, NULL, '', 55, NULL, ''),
(143, 'MN', 'Mongolia', '1', NULL, NULL, '', 54, NULL, ''),
(144, 'MS', 'Montserrat', '1', NULL, NULL, '', 53, NULL, ''),
(145, 'MA', 'Morocco', '1', NULL, NULL, '', 52, NULL, ''),
(146, 'MZ', 'Mozambique', '1', NULL, NULL, '', 51, NULL, ''),
(147, 'MM', 'Myanmar', '1', NULL, NULL, '', 50, NULL, ''),
(148, 'NA', 'Namibia', '1', NULL, NULL, '', 49, NULL, ''),
(149, 'NR', 'Nauru', '1', NULL, NULL, '', 33, NULL, ''),
(150, 'NP', 'Nepal', '1', NULL, NULL, '', 32, NULL, ''),
(151, 'NL', 'Netherlands', '1', NULL, NULL, '', 31, NULL, ''),
(152, 'AN', 'Netherlands Antilles', '1', NULL, NULL, '', 15, NULL, ''),
(153, 'NC', 'New Caledonia', '1', NULL, NULL, '', 14, NULL, ''),
(154, 'NZ', 'New Zealand', '1', NULL, NULL, '', 13, NULL, ''),
(155, 'NI', 'Nicaragua', '1', NULL, NULL, '', 12, NULL, ''),
(156, 'NE', 'Niger', '1', NULL, NULL, '', 11, NULL, ''),
(157, 'NG', 'Nigeria', '1', NULL, NULL, '', 10, NULL, ''),
(158, 'NU', 'Niue', '1', NULL, NULL, '', 9, NULL, ''),
(159, 'NF', 'Norfork Island', '1', NULL, NULL, '', 8, NULL, ''),
(160, 'MP', 'Northern Mariana Islands', '1', NULL, NULL, '', 7, NULL, ''),
(161, 'NO', 'Norway', '1', NULL, NULL, '', 6, NULL, ''),
(162, 'OM', 'Oman', '1', NULL, NULL, '', 5, NULL, ''),
(163, 'PK', 'Pakistan', '1', '', '13', '', 4, NULL, ''),
(164, 'PW', 'Palau', '1', NULL, NULL, '', 16, NULL, ''),
(165, 'PA', 'Panama', '1', NULL, NULL, '', 17, NULL, ''),
(166, 'PG', 'Papua New Guinea', '1', NULL, NULL, '', 18, NULL, ''),
(167, 'PY', 'Paraguay', '1', NULL, NULL, '', 30, NULL, ''),
(168, 'PE', 'Peru', '1', NULL, NULL, '', 29, NULL, ''),
(169, 'PH', 'Philippines', '1', NULL, NULL, '', 28, NULL, ''),
(170, 'PN', 'Pitcairn', '1', NULL, NULL, '', 27, NULL, ''),
(171, 'PL', 'Poland', '1', NULL, NULL, '', 26, NULL, ''),
(172, 'PT', 'Portugal', '1', NULL, NULL, '', 25, NULL, ''),
(173, 'PR', 'Puerto Rico', '1', NULL, NULL, '', 24, NULL, ''),
(174, 'QA', 'Qatar', '1', NULL, NULL, '', 23, NULL, ''),
(175, 'RE', 'Reunion', '1', NULL, NULL, '', 22, NULL, ''),
(176, 'RO', 'Romania', '1', NULL, NULL, '', 21, NULL, ''),
(177, 'RU', 'Russian Federation', '1', NULL, NULL, '', 20, NULL, ''),
(178, 'RW', 'Rwanda', '1', NULL, NULL, '', 19, NULL, ''),
(179, 'KN', 'Saint Kitts and Nevis', '1', NULL, NULL, '', 2, NULL, ''),
(180, 'LC', 'Saint Lucia', '1', NULL, NULL, '', 62, NULL, ''),
(181, 'VC', 'Saint Vincent and the Grenadines', '1', NULL, NULL, '', 121, NULL, ''),
(182, 'WS', 'Samoa', '1', NULL, NULL, '', 105, NULL, ''),
(183, 'SM', 'San Marino', '1', NULL, NULL, '', 104, NULL, ''),
(184, 'ST', 'Sao Tome and Principe', '1', NULL, NULL, '', 103, NULL, ''),
(185, 'SA', 'Saudi Arabia', '1', NULL, NULL, '', 102, NULL, ''),
(186, 'SN', 'Senegal', '1', NULL, NULL, '', 101, NULL, ''),
(187, 'SC', 'Seychelles', '1', NULL, NULL, '', 100, NULL, ''),
(188, 'SL', 'Sierra Leone', '1', NULL, NULL, '', 99, NULL, ''),
(189, 'SG', 'Singapore', '1', NULL, NULL, '', 98, NULL, ''),
(190, 'SK', 'Slovakia', '1', NULL, NULL, '', 97, NULL, ''),
(191, 'SI', 'Slovenia', '1', NULL, NULL, '', 96, NULL, ''),
(192, 'SB', 'Solomon Islands', '1', NULL, NULL, '', 95, NULL, ''),
(193, 'SO', 'Somalia', '1', NULL, NULL, '', 94, NULL, ''),
(194, 'ZA', 'South Africa', '1', NULL, NULL, '', 106, NULL, ''),
(195, 'GS', 'South Georgia South Sandwich Islands', '1', NULL, NULL, '', 107, NULL, ''),
(196, 'ES', 'Spain', '1', NULL, NULL, '', 108, NULL, ''),
(197, 'LK', 'Sri Lanka', '1', NULL, NULL, '', 120, NULL, ''),
(198, 'SH', 'St. Helena', '1', NULL, NULL, '', 119, NULL, ''),
(199, 'PM', 'St. Pierre and Miquelon', '1', NULL, NULL, '', 118, NULL, ''),
(200, 'SD', 'Sudan', '1', NULL, NULL, '', 117, NULL, ''),
(201, 'SR', 'Suriname', '1', NULL, NULL, '', 116, NULL, ''),
(202, 'SJ', 'Svalbarn and Jan Mayen Islands', '1', NULL, NULL, '', 115, NULL, ''),
(203, 'SZ', 'Swaziland', '1', NULL, NULL, '', 114, NULL, ''),
(204, 'SE', 'Sweden', '1', NULL, NULL, '', 113, NULL, ''),
(205, 'CH', 'Switzerland', '1', NULL, NULL, '', 112, NULL, ''),
(206, 'SY', 'Syrian Arab Republic', '1', NULL, NULL, '', 111, NULL, ''),
(207, 'TW', 'Taiwan', '1', NULL, NULL, '', 110, NULL, ''),
(208, 'TJ', 'Tajikistan', '1', NULL, NULL, '', 109, NULL, ''),
(209, 'TZ', 'Tanzania, United Republic of', '1', NULL, NULL, '', 93, NULL, ''),
(210, 'TH', 'Thailand', '1', NULL, NULL, '', 92, NULL, ''),
(211, 'TG', 'Togo', '1', NULL, NULL, '', 91, NULL, ''),
(212, 'TK', 'Tokelau', '1', NULL, NULL, '', 75, NULL, ''),
(213, 'TO', 'Tonga', '1', NULL, NULL, '', 74, NULL, ''),
(214, 'TT', 'Trinidad and Tobago', '1', NULL, NULL, '', 73, NULL, ''),
(215, 'TN', 'Tunisia', '1', NULL, NULL, '', 72, NULL, ''),
(216, 'TR', 'Turkey', '1', NULL, NULL, '', 71, NULL, ''),
(217, 'TM', 'Turkmenistan', '1', NULL, NULL, '', 70, NULL, ''),
(218, 'TC', 'Turks and Caicos Islands', '1', NULL, NULL, '', 69, NULL, ''),
(219, 'TV', 'Tuvalu', '1', NULL, NULL, '', 68, NULL, ''),
(220, 'UG', 'Uganda', '1', NULL, NULL, '', 67, NULL, ''),
(221, 'UA', 'Ukraine', '1', NULL, NULL, '', 66, NULL, ''),
(222, 'AE', 'United Arab Emirates', '1', NULL, NULL, '', 65, NULL, ''),
(223, 'GB', 'United Kingdom', '1', NULL, NULL, '', 64, NULL, ''),
(224, 'UM', 'United States minor outlying islands', '1', NULL, NULL, '', 76, NULL, ''),
(225, 'UY', 'Uruguay', '1', NULL, NULL, '', 77, NULL, ''),
(226, 'UZ', 'Uzbekistan', '1', NULL, NULL, '', 78, NULL, ''),
(227, 'VU', 'Vanuatu', '1', NULL, NULL, '', 90, NULL, ''),
(228, 'VA', 'Vatican City State', '1', NULL, NULL, '', 89, NULL, ''),
(229, 'VE', 'Venezuela', '1', '', '14', '', 88, NULL, ''),
(230, 'VN', 'Vietnam', '1', '', NULL, '', 87, NULL, '84'),
(231, 'VG', 'Virigan Islands (British)', '1', NULL, NULL, '', 86, NULL, ''),
(232, 'VI', 'Virgin Islands (U.S.)', '1', NULL, NULL, '', 85, NULL, ''),
(233, 'WF', 'Wallis and Futuna Islands', '1', NULL, NULL, '', 84, NULL, ''),
(234, 'EH', 'Western Sahara', '1', NULL, NULL, '', 83, NULL, ''),
(235, 'YE', 'Yemen', '1', NULL, NULL, '', 82, NULL, ''),
(236, 'YU', 'Yugoslavia', '1', NULL, NULL, '', 81, NULL, ''),
(237, 'ZR', 'Zaire', '1', NULL, NULL, '', 80, NULL, ''),
(238, 'ZM', 'Zambia', '1', NULL, NULL, '', 79, NULL, ''),
(239, 'ZW', 'Zimbabwe', '1', NULL, NULL, '', 63, NULL, ''),
(240, 'CH', '中国', '1', '', NULL, '', 1, NULL, ''),
(241, 'US', 'United States of America', '1', '', NULL, '', -1, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `doc_type` tinyint(4) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` int(255) DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `path` varchar(250) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `featured` tinyint(4) NOT NULL,
  `description` text NOT NULL,
  `ordering` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `alias` varchar(225) DEFAULT NULL,
  `address1` varchar(500) NOT NULL,
  `city_name` text,
  `pro_type` varchar(500) NOT NULL,
  `term_conditions` varchar(500) NOT NULL,
  `city_id` varchar(25) NOT NULL,
  `states` varchar(100) NOT NULL,
  `country_id` varchar(25) NOT NULL,
  `desc` longtext NOT NULL,
  `transaction` varchar(100) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `zip` varchar(100) NOT NULL,
  `images` mediumtext,
  `facility` mediumtext,
  `longitude` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `featured` tinyint(4) DEFAULT NULL,
  `hits` int(11) DEFAULT NULL,
  `code` varchar(100) NOT NULL,
  `map_desc` text NOT NULL,
  `mobile` varchar(200) NOT NULL,
  `vat_no` varchar(200) NOT NULL,
  `meta_keyword` text NOT NULL,
  `meta_desc` text NOT NULL,
  `ordering` int(11) NOT NULL,
  `params` text NOT NULL,
  `setting` int(11) NOT NULL,
  `ratings` float NOT NULL,
  `price1` decimal(15,2) NOT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `category_id`, `title`, `alias`, `address1`, `city_name`, `pro_type`, `term_conditions`, `city_id`, `states`, `country_id`, `desc`, `transaction`, `phone`, `agent_id`, `state`, `email`, `image`, `zip`, `images`, `facility`, `longitude`, `latitude`, `featured`, `hits`, `code`, `map_desc`, `mobile`, `vat_no`, `meta_keyword`, `meta_desc`, `ordering`, `params`, `setting`, `ratings`, `price1`, `created`) VALUES
(174, 113, 'Studio rez de jardin', 'studio-rez-de-jardin', '87-73 Boulevard Saint-Michel75005 Paris, France', 'Paris', '', '', '408', 'France', '', '<div>\r\n<div>\r\n<div class="">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec lectus ex. Aliquam sed eros libero. Curabitur eu fringilla justo.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div>\r\n<div>\r\n<div class="_y9ev9r">\r\n<div class="_x01z5ll">\r\n<div>\r\n<div>\r\n<p><strong>En détail</strong></p>\r\n<div>\r\n<div class="">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec lectus ex. Aliquam sed eros libero. Curabitur eu fringilla justo. Cras sed scelerisque erat. In egestas nec dolor bibendum dapibus. Nunc feugiat nisi et magna gravida blandit. In convallis dui ornare sollicitudin convallis. Phasellus a elit ac eros aliquam tempus. Duis porta nisl id nisi sagittis, ut eleifend purus auctor. Morbi elementum mauris ut purus ultrices, tristique aliquet dolor mattis. Fusce non vulputate tellus. Mauris tempus molestie varius. Proin molestie aliquet quam, ac interdum arcu venenatis vestibulum. Maecenas mattis mauris in molestie condimentum. Aenean turpis augue, posuere vel faucibus ut, ultrices at ligula. Duis in risus lorem.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '', '', 400, 1, '', 'images/strd.jpg', '00', NULL, '110:111:114:116:119:123', '2.340548500000068', '48.8460563', 1, NULL, '810929', '0', '', '', '', '', 0, '{"map_desc":"Studio kitchenette en rez de jardin centre ville de Saint Etienne","logo_hotel":"86889048.jpg"}', 4, 0, '10.00', NULL),
(229, 0, 'Palais royal', NULL, 'Tour Eiffel - Parc du Champ-de-Mars, 75007 Paris, France', 'Paris', '', '', '', '', '', 'C’est in Palais royal', '', '3306123456', 436, 1, NULL, 'images/logo/229/hotel_229.png', '', NULL, '117:119:121', '48.855899', '48.855899', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":"A cote de la tour Eiffel"}', 0, 0, '1.00', '2018-03-14 10:52:30'),
(234, 0, 'La Clef Louvre', NULL, '8 Rue de Richelieu, 75001 Paris, France', 'France', '', '', '', '', '', 'This is the nice place with plant, there u can into with nature and happiness.', '', '123123', 7, 1, NULL, 'images/logo/234/hotel_234.png', '', NULL, '110:112', '2.336259', '48.863812', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":"Straight ahead, near Place Andr\\u00e9 Malraux"}', 0, 0, '10.00', '2018-03-15 15:55:38'),
(235, 112, 'Le rêve du Saint Jacques', 'le-reve-du-saint-jacques', '112 Rue Saint-Jacques, 75005 Paris, France', '', '', '', '428', '', '', '<p>Maison en Bois is a new retro apartment which is located in the central of Hanoi - Ly Thuong Kiet Street. At Maison en Bois, you will have a spectacular experience about space and design. This apartment is perfect for travelers who want to explore a different side of Hanoi, to breath the local atmosphere and see the daily life things. It is not far away from all of famous attractions and easy to go by walk.</p>', '', '84915265359', 377, 1, NULL, 'images/logo/235/hotel_235.png', '', NULL, '114:116:118:119:121:123', '2.3522219000000177', '48.856614', NULL, NULL, '', 'The space\r\n\r\n\r\n\r\n\r\nBeaver Island is a great getaway vacation spot. This apartment is located above the hardware store and is footsteps away from museums, restaurants the marina and ferry dock.\r\n\r\n\r\n', '', '', '', '', 0, '{"map_desc":"The space\\r\\n\\r\\n\\r\\n\\r\\n\\r\\nBeaver Island is a great getaway vacation spot. This apartment is located above the hardware store and is footsteps away from museums, restaurants the marina and ferry dock.\\r\\n\\r\\n\\r\\n"}', 0, 0, '2.00', '2018-03-16 10:36:15'),
(236, 0, 'Maison curieuses', NULL, '12 Boulevard du Montparnasse, 75006 Paris, France', '', '', '', '', '', '', 'Une maison curieuse avec une belle vue vers le Montparnasse', '', '84915265359', 395, NULL, NULL, 'images/logo/236/hotel_236.png', '', NULL, '118:120:116:114:115:117:119:121:123:125', '48.846043', '48.846043', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":"Gare de Montparnasse"}', 0, 0, '2.00', '2018-03-16 14:43:20'),
(237, 0, 'studio', NULL, '63B Rue Montesquieu, 42100 Saint-Étienne, France', '', '', '', '', '', '', 'Studio 1 chambre près du cours fauriel', '', '3306123456', 436, 1, NULL, 'images/logo/237/hotel_237.png', '', NULL, '110:120:118:126', '45.425319', '45.425319', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":""}', 0, 0, '2.00', '2018-03-20 00:54:05'),
(238, 0, 'studio', NULL, '63B Rue Montesquieu, 42100 Saint-Étienne, France', '', '', '', '', '', '', 'Studio proche fauriel', '', '3306123456', 436, 1, NULL, 'images/logo/238/hotel_238.png', '', NULL, '110:118:120:126', '45.425018', '45.425018', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":""}', 0, 0, '3.00', '2018-03-20 00:56:00'),
(239, 0, 'Chevalier du Nord', NULL, '190 Rue Montmartre, 75009 Paris, France', '', '', '', '', '', '', 'Belle Maison ', '', '3306123456', 436, 1, NULL, 'images/logo/239/hotel_239.png', '', NULL, '117:119:123', '48.871144', '48.871144', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":"A la rue Montmartre "}', 0, 0, '1.00', '2018-03-20 08:42:39'),
(240, 0, 'La nouvelle saison', NULL, 'Porte de Clichy, 75017 Paris, France', 'Paris', '', '', '', '', '', 'C''est une maison ', '', '330611224466', 480, 1, NULL, 'images/logo/240/hotel_240.png', '', NULL, '115:116:118:120', '48.895145', '48.895145', NULL, NULL, '', '0', '', '', '', '', 0, '{"map_desc":"A c\\u00f4t\\u00e9 de la gare de Lyon "}', 0, 0, '1.00', '2018-03-21 09:03:28'),
(241, 112, 'Hai Dang Hotel', 'hai-dang-hotel', 'Hanoi Amsterdam', NULL, '', '', '408', '1231231', '', '<div>\r\n<div class="_ew0cqip">Summary</div>\r\n</div>\r\n<div>\r\n<div class="simple-format-container">\r\n<div dir="ltr">\r\n<p class="_6z3til">Maison en Bois is a new retro apartment which is located in the central of Hanoi - Ly Thuong Kiet Street. At Maison en Bois, you will have a spectacular experience about space and design. This apartment is perfect for travelers who want to explore a different side of Hanoi, to breath the local atmosphere and see the daily life things. It is not far away from all of famous attractions and easy to go by walk.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div>\r\n<div>\r\n<div class="_ew0cqip">The space</div>\r\n</div>\r\n<div>\r\n<div class="simple-format-container">\r\n<div dir="ltr">\r\n<p class="_6z3til">The unique things in Maison en Bois is all of the decorations. All of them are handmade by the hosts. And everything in Maison en Bois give you a warm welcome and cozy atmosphere. The bathroom is the star of Maison en Bois with tropical style. Beside that, the apartment is located in very old French structured building with ancient messy hallway and stair. Just like Alice in Wonderland, a beautiful place is always at the end of the ugly tunnel :).</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', '', '', 483, 1, NULL, 'images/supplier/241/.png', '', NULL, '111:112:113:114:115:116', '2.3535160621238447', '48.85378150450999', NULL, NULL, '820387', 'Beaver Island is a great getaway vacation spot. This apartment is located above the hardware store and is footsteps away from museums, restaurants the marina and ferry dock.', '', '', '', '', 0, '{"map_desc":"Beaver Island is a great getaway vacation spot. This apartment is located above the hardware store and is footsteps away from museums, restaurants the marina and ferry dock."}', 0, 4, '10.00', NULL);
-- --------------------------------------------------------

--
-- Table structure for table `typecontact`
--
CREATE TABLE `mandexpa`.`typecontact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nametype` VARCHAR(45) NULL DEFAULT NULL,
  `account_id` VARCHAR(45) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`));






CREATE TABLE `mandexpa`.`subcribers` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `user_id` INT(11) NOT NULL ,
    `sub_id` INT(11) NOT NULL ,
    `main_price` INT(20) NOT NULL ,
    `second_price` INT(20) NOT NULL ,
    `start_date` DATE NOT NULL ,
    `end_date` DATE NOT NULL ,
    `state` TINYINT NOT NULL DEFAULT '1' ,
    `created_by` INT(11) NULL DEFAULT NULL ,
    `created_date` DATE NOT NULL ,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;



    --
    -- Cấu trúc bảng cho bảng `subcriptions`
    --

    CREATE TABLE `subcriptions` (
      `id` int(11) NOT NULL,
      `title` varchar(1000) DEFAULT NULL,
      `main_price` int(20) DEFAULT NULL,
      `second_price` int(20) NOT NULL,
      `numbers_day` int(11) NOT NULL,
      `state` tinyint(4) NOT NULL DEFAULT '1'
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    --
    -- Chỉ mục cho các bảng đã đổ
    --

    --
    -- Chỉ mục cho bảng `subcriptions`
    --
    ALTER TABLE `subcriptions`
      ADD PRIMARY KEY (`id`);

    --
    -- AUTO_INCREMENT cho các bảng đã đổ
    --

    --
    -- AUTO_INCREMENT cho bảng `subcriptions`
    --
    ALTER TABLE `subcriptions`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
    COMMIT;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`pro_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`pro_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;
--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=513;
--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;
--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=767;
--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
