require("dotenv").config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const { User, Product } = require('../models');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@gadgethub.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: userPassword,
      role: 'user'
    });

    console.log('Users created');

    // Sample products data - 54 products across all categories
    const products = [
      // Mobiles (9 products)
      {
        title: 'iPhone 15 Pro Max 256GB',
        price: 154900,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, 48MP camera system with 5x optical zoom, and all-day battery life. Features Action button and USB-C connectivity.',
        stock: 50,
        rating: 4.9
      },
      {
        title: 'iPhone 15 Plus 128GB',
        price: 99900,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1592286927505-4d32542b0a78?w=500',
        description: 'Large 6.7-inch Super Retina XDR display, A16 Bionic chip, advanced dual-camera system, and Dynamic Island. Perfect for entertainment and productivity.',
        stock: 65,
        rating: 4.7
      },
      {
        title: 'Samsung Galaxy S24 Ultra 512GB',
        price: 144999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        description: 'Premium flagship with built-in S Pen, 200MP camera with AI enhancement, Snapdragon 8 Gen 3, titanium frame, and Galaxy AI features for productivity.',
        stock: 45,
        rating: 4.8
      },
      {
        title: 'Samsung Galaxy Z Fold 5',
        price: 154999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1660463976-56e0ed69c258?w=500',
        description: 'Revolutionary foldable smartphone with 7.6-inch main display, multitasking capabilities, Snapdragon 8 Gen 2, and improved hinge design for durability.',
        stock: 30,
        rating: 4.6
      },
      {
        title: 'OnePlus 12 5G',
        price: 64999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        description: 'Flagship killer with Snapdragon 8 Gen 3, 100W SUPERVOOC fast charging, Hasselblad camera system, and 2K 120Hz ProXDR display.',
        stock: 80,
        rating: 4.7
      },
      {
        title: 'Google Pixel 8 Pro',
        price: 106999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        description: 'Googles most advanced phone with Tensor G3 chip, AI-powered photography, 7 years of updates, Magic Eraser, and Best Take features.',
        stock: 40,
        rating: 4.6
      },
      {
        title: 'Xiaomi 14 Ultra',
        price: 99999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500',
        description: 'Leica optics quad camera system, Snapdragon 8 Gen 3, 2K AMOLED display, 90W fast charging, and professional photography features.',
        stock: 55,
        rating: 4.5
      },
      {
        title: 'Nothing Phone (2)',
        price: 44999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500',
        description: 'Unique Glyph Interface, transparent design, Snapdragon 8+ Gen 1, 50MP dual camera, and clean Nothing OS experience.',
        stock: 70,
        rating: 4.4
      },
      {
        title: 'Motorola Edge 40 Pro',
        price: 69999,
        category: 'Mobiles',
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500',
        description: 'Curved pOLED 165Hz display, Snapdragon 8 Gen 2, 125W TurboPower charging, IP68 rating, and clean Android experience.',
        stock: 60,
        rating: 4.5
      },
      // Laptops (9 products)
      {
        title: 'MacBook Pro 16" M3 Max',
        price: 349900,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        description: 'Supercharged by M3 Max chip with 40-core GPU, 36GB unified memory, 22-hour battery life, and stunning Liquid Retina XDR display. Perfect for professionals.',
        stock: 25,
        rating: 4.9
      },
      {
        title: 'MacBook Air 15" M3',
        price: 164900,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500',
        description: 'Impossibly thin design, M3 chip with 8-core GPU, 15.3-inch Liquid Retina display, 18-hour battery life, and fanless design for silent operation.',
        stock: 40,
        rating: 4.8
      },
      {
        title: 'Dell XPS 15 OLED',
        price: 189999,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        description: 'Premium laptop with 3.5K OLED InfinityEdge display, Intel Core i9, NVIDIA RTX 4060, 32GB RAM, and machined aluminum chassis.',
        stock: 30,
        rating: 4.7
      },
      {
        title: 'HP Spectre x360 14',
        price: 159999,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        description: '2-in-1 convertible with 3K2K OLED touchscreen, Intel Core i7, 16GB RAM, gem-cut design, and premium craftsmanship.',
        stock: 28,
        rating: 4.6
      },
      {
        title: 'Lenovo ThinkPad X1 Carbon Gen 11',
        price: 179999,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        description: 'Ultra-lightweight business laptop with 14" 2.8K OLED display, Intel vPro, military-grade durability, and legendary ThinkPad keyboard.',
        stock: 35,
        rating: 4.7
      },
      {
        title: 'ASUS ROG Zephyrus G14',
        price: 199990,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1636489953087-c47d63f3ce10?w=500',
        description: 'Powerful gaming laptop with AMD Ryzen 9, RTX 4070, 165Hz QHD+ display, AniMe Matrix LED lid, and premium build quality.',
        stock: 20,
        rating: 4.8
      },
      {
        title: 'Acer Swift Go 14',
        price: 89999,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1544117519-98c08e64aac6?w=500',
        description: 'OLED productivity laptop with Intel Core i7, 16GB RAM, 1TB SSD, 2.8K 90Hz display, and lightweight design at just 1.25kg.',
        stock: 45,
        rating: 4.5
      },
      {
        title: 'Microsoft Surface Laptop 5',
        price: 134999,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1531217937742-8c75e299765a?w=500',
        description: 'Elegant design with PixelSense touchscreen, Intel Core i7, Alcantara palm rest, and optimized for Windows 11 and Microsoft 365.',
        stock: 32,
        rating: 4.6
      },
      {
        title: 'Razer Blade 15',
        price: 249990,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
        description: 'Premium gaming laptop with RTX 4080, Intel Core i9, 240Hz QHD display, CNC aluminum unibody, and per-key RGB keyboard.',
        stock: 15,
        rating: 4.7
      },
      // Headphones (9 products)
      {
        title: 'Sony WH-1000XM5',
        price: 29990,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
        description: 'Industry-leading noise cancellation with 30-hour battery life, multipoint connection, and exceptional LDAC sound quality for audiophiles.',
        stock: 100,
        rating: 4.9
      },
      {
        title: 'Apple AirPods Pro 2',
        price: 24900,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
        description: 'Active Noise Cancellation with Adaptive Audio, personalized Spatial Audio, MagSafe charging case, and seamless Apple ecosystem integration.',
        stock: 150,
        rating: 4.8
      },
      {
        title: 'Bose QuietComfort Ultra',
        price: 32990,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        description: 'Immersive spatial audio, world-class noise cancellation, luxurious comfort, and 24-hour battery life for premium listening experience.',
        stock: 85,
        rating: 4.7
      },
      {
        title: 'Sennheiser Momentum 4',
        price: 34990,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1583394838336-acd966de2bbc?w=500',
        description: 'Audiophile-grade sound with 60-hour battery life, adaptive ANC, customizable EQ, and premium build quality for music enthusiasts.',
        stock: 70,
        rating: 4.8
      },
      {
        title: 'JBL Tune 770NC',
        price: 7999,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500',
        description: 'Affordable wireless headphones with active noise cancellation, 44-hour battery, JBL Pure Bass sound, and lightweight foldable design.',
        stock: 200,
        rating: 4.4
      },
      {
        title: 'Samsung Galaxy Buds2 Pro',
        price: 17999,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500',
        description: 'Intelligent ANC, 360 Audio, Hi-Fi 24-bit audio, seamless Samsung integration, and comfortable ergonomic fit.',
        stock: 130,
        rating: 4.6
      },
      {
        title: 'Beats Studio Pro',
        price: 34900,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500',
        description: 'Custom acoustic platform, lossless audio via USB-C, enhanced ANC, Transparency mode, and up to 40 hours of battery life.',
        stock: 90,
        rating: 4.5
      },
      {
        title: 'Sony WF-1000XM5',
        price: 26990,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1600180758890-6a948987f4b5?w=500',
        description: 'Premium true wireless earbuds with industry-best noise cancellation, Hi-Res audio, 8-hour battery, and ultra-compact design.',
        stock: 110,
        rating: 4.8
      },
      {
        title: 'Bose Sport Earbuds',
        price: 14990,
        category: 'Headphones',
        image: 'https://images.unsplash.com/photo-1612470744714-4e5a33972cd4?w=500',
        description: 'Designed for workouts with secure fit, lifelike sound, IPX4 water resistance, and 5-hour battery life per charge.',
        stock: 140,
        rating: 4.5
      },
      // Smart Watches (9 products)
      {
        title: 'Apple Watch Ultra 2',
        price: 89900,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
        description: 'The most rugged and capable Apple Watch with 49mm titanium case, precision GPS, 36-hour battery, and advanced health sensors for extreme adventures.',
        stock: 35,
        rating: 4.9
      },
      {
        title: 'Apple Watch Series 9',
        price: 49900,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1546868576-0-b79ac47b9577?w=500',
        description: 'Advanced health features, Double Tap gesture, brighter display, S9 chip, and comprehensive fitness tracking in sleek design.',
        stock: 60,
        rating: 4.8
      },
      {
        title: 'Samsung Galaxy Watch 6 Classic',
        price: 39999,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
        description: 'Rotating bezel, advanced sleep coaching, body composition analysis, sapphire crystal glass, and Wear OS powered by Samsung.',
        stock: 50,
        rating: 4.7
      },
      {
        title: 'Garmin Fenix 7X Solar',
        price: 84990,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        description: 'Premium multisport GPS watch with solar charging, 37-day battery life, topographic maps, and advanced training metrics.',
        stock: 25,
        rating: 4.9
      },
      {
        title: 'Fitbit Sense 2',
        price: 24999,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
        description: 'Health-focused smartwatch with stress management, ECG app, 6+ day battery, sleep tracking, and built-in GPS.',
        stock: 75,
        rating: 4.5
      },
      {
        title: 'Amazfit GTR 4',
        price: 15999,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1517616545778-5c7d9b697818?w=500',
        description: '14-day battery life, 150+ sports modes, dual-band GPS, Alexa built-in, and comprehensive health monitoring at affordable price.',
        stock: 100,
        rating: 4.4
      },
      {
        title: 'Fossil Gen 6',
        price: 25999,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e3835?w=500',
        description: 'Wear OS by Google, Snapdragon Wear 4100+, rapid charging, customizable watch faces, and classic Fossil design.',
        stock: 45,
        rating: 4.3
      },
      {
        title: 'Garmin Venu 3',
        price: 49990,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1575311373937-0d39b1380c4?w=500',
        description: 'AMOLED display, 14-day battery, sleep coaching, wheelchair mode, and comprehensive wellness features in elegant design.',
        stock: 40,
        rating: 4.7
      },
      {
        title: 'OnePlus Watch 2',
        price: 26999,
        category: 'Smart Watches',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
        description: 'Dual-engine architecture, 100-hour battery, Wear OS, 5ATM water resistance, and seamless OnePlus ecosystem integration.',
        stock: 55,
        rating: 4.5
      },
      // Gaming (9 products)
      {
        title: 'PlayStation 5 Slim',
        price: 49990,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
        description: 'Next-gen gaming with ultra-fast SSD, stunning ray tracing graphics, DualSense controller with haptic feedback, and exclusive titles.',
        stock: 30,
        rating: 4.9
      },
      {
        title: 'Xbox Series X',
        price: 49990,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500',
        description: 'Most powerful Xbox with 12 teraflops, 1TB SSD, Xbox Game Pass compatibility, Quick Resume, and 4K gaming at 120fps.',
        stock: 35,
        rating: 4.8
      },
      {
        title: 'Nintendo Switch OLED',
        price: 34999,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
        description: 'Hybrid gaming with vibrant 7-inch OLED screen, enhanced audio, wide adjustable stand, and 64GB storage for on-the-go gaming.',
        stock: 50,
        rating: 4.7
      },
      {
        title: 'Steam Deck OLED 512GB',
        price: 56999,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1631284927299-d684987e8b61?w=500',
        description: 'Handheld PC gaming with HDR OLED display, 50Wh battery, Wi-Fi 6E, and access to entire Steam library anywhere.',
        stock: 25,
        rating: 4.8
      },
      {
        title: 'ASUS ROG Ally',
        price: 54990,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1648392805688-8735d10b7e6e?w=500',
        description: 'Windows 11 handheld gaming device with AMD Z1 Extreme, 120Hz FHD display, and access to multiple game stores.',
        stock: 28,
        rating: 4.6
      },
      {
        title: 'PlayStation VR2',
        price: 59990,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500',
        description: 'Next-gen VR gaming with 4K HDR OLED display, eye tracking, 3D audio, haptic feedback, and immersive gaming experience.',
        stock: 20,
        rating: 4.7
      },
      {
        title: 'Xbox Elite Controller Series 2',
        price: 14999,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500',
        description: 'Pro-level controller with adjustable tension thumbsticks, mappable paddles, hair trigger locks, and 40-hour battery life.',
        stock: 60,
        rating: 4.8
      },
      {
        title: 'Razer BlackWidow V4 Pro',
        price: 18999,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1595225476279-4204e0e41e78?w=500',
        description: 'Mechanical gaming keyboard with Razer Green switches, per-key RGB, magnetic wrist rest, command dial, and macro keys.',
        stock: 45,
        rating: 4.7
      },
      {
        title: 'Logitech G Pro X Superlight 2',
        price: 11999,
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        description: 'Ultra-lightweight wireless gaming mouse at 60g, HERO 2 sensor, 95-hour battery, and LIGHTSPEED technology for esports.',
        stock: 70,
        rating: 4.9
      },
      // Accessories (9 products)
      {
        title: 'Anker PowerCore 26800mAh',
        price: 3999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
        description: 'Massive capacity power bank with PowerIQ technology, charges 3 devices simultaneously, perfect for travel and emergencies.',
        stock: 250,
        rating: 4.7
      },
      {
        title: 'Logitech MX Master 3S',
        price: 9995,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        description: 'Ergonomic wireless mouse with ultra-fast MagSpeed scrolling, 8K DPI sensor, quiet clicks, and 70-day battery life for productivity.',
        stock: 180,
        rating: 4.9
      },
      {
        title: 'Samsung T7 Shield 2TB',
        price: 15999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        description: 'Rugged portable SSD with IP65 water/dust resistance, 1050MB/s speeds, 3-meter drop protection, and hardware encryption.',
        stock: 120,
        rating: 4.8
      },
      {
        title: 'Apple Magic Keyboard',
        price: 12900,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        description: 'Wireless keyboard with Touch ID, numeric keypad, scissor mechanism, and seamless Mac pairing for ultimate productivity.',
        stock: 90,
        rating: 4.6
      },
      {
        title: 'Belkin 3-in-1 MagSafe Charger',
        price: 11999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1625799400064-274a7945d45e?w=500',
        description: 'Charge iPhone, Apple Watch, and AirPods simultaneously with 15W fast charging, sleek design, and official MagSafe certification.',
        stock: 100,
        rating: 4.7
      },
      {
        title: 'SanDisk Extreme Pro 256GB',
        price: 4999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1612470744714-4e5a33972cd4?w=500',
        description: 'High-performance microSD card with 200MB/s read speeds, 4K UHD video recording, A2 app performance, and durability.',
        stock: 300,
        rating: 4.8
      },
      {
        title: 'Elgato Stream Deck+',
        price: 17999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        description: 'Customizable LCD keys, 4 dials, plugin ecosystem for streaming, content creation, and productivity workflows.',
        stock: 40,
        rating: 4.8
      },
      {
        title: 'Rode NT-USB Mini',
        price: 9999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500',
        description: 'Studio-quality USB microphone for podcasting, streaming, and gaming with cardioid pattern and zero-latency monitoring.',
        stock: 65,
        rating: 4.7
      },
      {
        title: 'Anker 737 Power Bank 24000mAh',
        price: 9999,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1618397746666-38636e2179d1?w=500',
        description: '140W output charges laptops, smart digital display, bidirectional fast charging, and premium build for professionals.',
        stock: 85,
        rating: 4.8
      }
    ];

    await Product.bulkCreate(products);
    console.log(`${products.length} products created`);

    console.log('Database seeding completed successfully!');
    console.log('\nTest Credentials:');
    console.log('Admin: admin@gadgethub.com / admin123');
    console.log('User: john@example.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
