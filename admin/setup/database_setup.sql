CREATE DATABASE IF NOT EXISTS chillfizz_db;
USE chillfizz_db;

-- Services table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    color VARCHAR(100),
    hover_color VARCHAR(100),
    icon_class VARCHAR(50),
    extra_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Employee reviews table
CREATE TABLE employee_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    review_text TEXT NOT NULL,
    card_class VARCHAR(50),
    background_color VARCHAR(100),
    rotation VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    sub_brand VARCHAR(255),
    icon_class VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Director message table
CREATE TABLE director_message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    message TEXT NOT NULL,
    director_name VARCHAR(255),
    director_position VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO services (title, description, category, color, hover_color, icon_class, extra_info) VALUES
('Premium Juice Blends', 'Artisan-crafted cold-pressed juices made from the finest organic fruits and vegetables.', 'products', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)', 'fa-blender', 'Over 20 unique flavors'),
('Custom Smoothies', 'Personalized smoothie creations tailored to your taste preferences and dietary needs.', 'products', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #d783e0 0%, #d44d61 100%)', 'fa-glass-whiskey', 'Vegan and protein options available'),
('Seasonal Specials', 'Seasonal specials that create buzz and keep customers coming back for more.', 'products', 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 'linear-gradient(135deg, #e0c05a 0%, #e58f77 100%)', 'fa-ice-cream', 'Summer Berry, Winter Spice, Spring Blossom'),
('Bulk Distribution', 'Reliable nationwide delivery for retailers, restaurants, and events.', 'distribution', 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', 'linear-gradient(135deg, #8f7cbc 0%, #e0afd7 100%)', 'fa-truck', 'Nationwide next-day delivery'),
('Retail Partnerships', 'Customized placement and promotional programs for retail stores.', 'distribution', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #d783e0 0%, #d44d61 100%)', 'fa-store', '500+ retail locations'),
('Private Label', 'Create your own branded cold drinks with our expert formulation team.', 'custom', 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', 'linear-gradient(135deg, #28b8b9 0%, #2a0754 100%)', 'fa-cocktail', 'Hotels, Airlines, Events');

INSERT INTO employee_reviews (name, image_url, review_text, card_class, background_color, rotation) VALUES
('Aarohi Sharma', 'https://i.pravatar.cc/150?img=32', 'The juices taste incredibly fresh and vibrant. A daily treat that keeps me energized.', 'card-mint', 'linear-gradient(135deg, #b2dfdb, #80cbc4)', 'rotate(-3deg)'),
('Rohan Mehta', 'https://i.pravatar.cc/150?img=33', 'The flavors are amazing, and I feel great knowing they\'re made with natural ingredients.', 'card-sky', 'linear-gradient(135deg, #90caf9, #64b5f6)', 'rotate(2deg)'),
('Ananya Nair', 'https://i.pravatar.cc/150?img=34', 'I feel rejuvenated after every sip. The juices are delicious and refreshing.', 'card-sun', 'linear-gradient(135deg, #fff59d, #ffe082)', 'rotate(-2deg)'),
('Ishita Rao', 'https://i.pravatar.cc/150?img=35', 'These juices are my go-to for a healthy pick-me-up. Always taste so fresh.', 'card-lavender', 'linear-gradient(135deg, #ce93d8, #ba68c8)', 'rotate(3deg)'),
('Arjun Singh', 'https://i.pravatar.cc/150?img=36', 'Perfect blend of taste and nutrition. I recommend these to all my friends.', 'card-coral', 'linear-gradient(135deg, #ffab91, #ff8a65)', 'rotate(-1deg)');

INSERT INTO clients (brand, sub_brand, icon_class) VALUES
('FreshMart', 'Premium Retail', 'fa-store'),
('QuickServe', 'Fast Delivery', 'fa-shipping-fast'),
('HealthPlus', 'Wellness Chain', 'fa-heartbeat'),
('GreenGrocer', 'Organic Market', 'fa-leaf'),
('CityMall', 'Shopping Center', 'fa-building'),
('NutriCafe', 'Health Cafe', 'fa-coffee');

INSERT INTO director_message (title, message, director_name, director_position) VALUES
('Welcome to ChillFizz', 'At ChillFizz, we believe that every sip should be a moment of pure refreshment and joy. Our commitment to quality and innovation drives us to create the most delicious and nutritious beverages for our valued customers.', 'Dr. Rajesh Kumar', 'Managing Director & CEO');