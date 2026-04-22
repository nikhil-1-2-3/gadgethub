import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { fadeIn, staggerContainer } from '../animations/pageTransitions';
import { Smartphone, Laptop, Headphones, Watch, Gamepad2, Plug } from 'lucide-react';
import Background3D from '../components/Background3D';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?limit=12');
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Mobiles', icon: Smartphone, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
    { name: 'Laptops', icon: Laptop, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
    { name: 'Headphones', icon: Headphones, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
    { name: 'Smart Watches', icon: Watch, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
    { name: 'Gaming', icon: Gamepad2, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400' },
    { name: 'Accessories', icon: Plug, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 3D Animated Background */}
        <Background3D />
        
        <motion.div className="hero-content" style={{ y, opacity }}>
          <motion.h1
            variants={fadeIn}
            className="hero-title"
          >
            <span className="title-line">Discover Premium</span>
            <span className="title-line gradient-text">Gadgets & Electronics</span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="hero-subtitle"
          >
            Shop the latest technology with unbeatable prices and premium quality
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="hero-buttons"
          >
            <Link to="/category/mobiles" className="btn-primary btn-large">
              Explore Now
            </Link>
            <Link to="/category/laptops" className="btn-secondary btn-large">
              View Collection
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div variants={fadeIn} className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        className="categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn}>Shop by Category</motion.h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeIn}
              className="category-card"
              whileHover={{ y: -10 }}
            >
              <Link to={`/category/${category.name.toLowerCase()}`}>
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <category.icon className="category-icon" size={48} />
                  </motion.div>
                  <h3>{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="products-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeIn}>Featured Products</motion.h2>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="newsletter-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get exclusive deals and updates delivered to your inbox</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
