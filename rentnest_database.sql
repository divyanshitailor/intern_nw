-- ===================================================
-- RentNest Database Schema & Demo Data
-- Generated for Academic Presentation at SKIT Jaipur
-- Database: rentnest_db
-- ===================================================

CREATE DATABASE IF NOT EXISTS `rentnest_db`;
USE `rentnest_db`;

-- 1. Users Table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('owner','tenant') NOT NULL DEFAULT 'tenant',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Garima (Owner)', 'owner@rentnest.com', '$2b$10$1CwgcqbJsfGbQ6BWqubKseyCORC7JY68HaMFWLe4TepXUefQTjvAu', 'owner'),
(2, 'Garima (Tenant)', 'tenant@rentnest.com', '$2b$10$qd8HkBY4eEoQWwiFzzufz.aVl8SVBrY2sx72onqfhQxzSqrFmzHXm', 'tenant');

-- 2. Properties Table
DROP TABLE IF EXISTS `properties`;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `city` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `property_type` varchar(50) NOT NULL,
  `bhk` int DEFAULT NULL,
  `area_sqft` int DEFAULT NULL,
  `amenities` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `properties_fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `properties` (`id`, `owner_id`, `title`, `description`, `price`, `city`, `address`, `property_type`, `bhk`, `area_sqft`, `amenities`, `images`) VALUES
(1, 1, 'Luxury 3BHK Apartment near SKIT', 'Fully furnished 3BHK apartment with modular kitchen, spacious balcony, high-speed WiFi and 24/7 power backup. Ideal for students and families.', 24000.00, 'Jaipur', 'Ramnagariya, Jagatpura, Jaipur (Near SKIT College)', 'Apartment', 3, 1450, '["WiFi", "Lift", "Parking", "Power Backup", "24/7 Security", "Gym"]', '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"]'),
(2, 1, 'Cozy Studio PG for Students', 'Single occupancy AC studio room with attached washroom, study desk, meal facility, and high-speed internet. 5 mins walking from campus.', 8500.00, 'Jaipur', 'Mahal Road, Jagatpura, Jaipur', 'PG', 1, 350, '["WiFi", "Meals Included", "Air Conditioner", "Housekeeping", "Laundry"]', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]'),
(3, 1, 'Modern 2BHK High-Rise Flat', 'Sunlit modern flat with premium fittings, wooden flooring in master bedroom, swimming pool access, and covered car parking.', 32000.00, 'Bangalore', 'Koramangala 5th Block, Bangalore', 'Apartment', 2, 1100, '["Swimming Pool", "Gym", "Covered Parking", "Clubhouse", "WiFi"]', '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]'),
(4, 1, 'Premium 4BHK Independent Villa', 'Luxurious duplex villa with private lawn, Italian marble finish, personal home theatre room, and servant quarter.', 75000.00, 'Jaipur', 'Malviya Nagar, Sector 4, Jaipur', 'Villa', 4, 2800, '["Private Lawn", "Modular Kitchen", "Solar Power", "Car Parking", "Security"]', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"]'),
(5, 1, 'Sea Facing Luxury Penthouse', 'Top floor penthouse offering breathtaking sea views, private infinity jacuzzi, smart home automation and 3 car parking slots.', 95000.00, 'Mumbai', 'Carter Road, Bandra West, Mumbai', 'Penthouse', 3, 2100, '["Sea View", "Jacuzzi", "Smart Home", "24/7 Concierge", "Valet Parking"]', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]'),
(6, 1, 'Affordable 1BHK Flat in City Center', 'Well maintained semi-furnished apartment close to metro station, supermarkets, and tech parks. Low maintenance charges.', 15000.00, 'Bangalore', 'HSR Layout Sector 2, Bangalore', 'Apartment', 1, 650, '["WiFi", "Lift", "Security", "Water Supply 24/7"]', '["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"]');

-- 3. Saved Properties (Wishlist) Table
DROP TABLE IF EXISTS `saved_properties`;
CREATE TABLE `saved_properties` (
  `saved_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`saved_id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `saved_properties_fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `saved_properties_fk_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
