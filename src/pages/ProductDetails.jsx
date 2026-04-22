import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { fadeIn, staggerContainer } from '../animations/pageTransitions';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const images = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const reviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Exceeded my expectations.',
      date: '2 days ago'
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Great quality, fast delivery. Highly recommend!',
      date: '1 week ago'
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      comment: 'Perfect! Exactly what I was looking for.',
      date: '2 weeks ago'
    }
  ];

  return (
    <motion.div 
      className="product-details-page" 
      initial="hidden" 
      animate="visible"
      variants={staggerContainer}
    >
      <div className="product-details-content">
        <motion.div className="product-images" variants={fadeIn}>
          <div className="main-image">
            <img src={images[selectedImage]} alt={product.title} />
          </div>
          <div className="thumbnail-images">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div className="product-details-info" variants={fadeIn}>
          <h1>{product.title}</h1>
          
          <div className="product-rating-large">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                  color={i < Math.floor(product.rating) ? '#f59e0b' : '#9ca3af'}
                />
              ))}
            </div>
            <span className="rating-text">{product.rating} (127 reviews)</span>
          </div>
          
          <div className="product-price-large">₹{product.price.toLocaleString()}</div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-features">
            <div className="feature">
              <Truck size={20} />
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <Shield size={20} />
              <span>1 Year Warranty</span>
            </div>
            <div className="feature">
              <RotateCcw size={20} />
              <span>7 Days Return</span>
            </div>
          </div>
          
          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <motion.button 
              className="btn-primary" 
              onClick={() => addToCart(product, quantity)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} /> Wishlist
            </motion.button>
          </div>
          
          <div className="product-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Reviews Section */}
      <motion.div className="reviews-section" variants={fadeIn}>
        <h2>Customer Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <motion.div 
              key={review.id} 
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">{review.user.charAt(0)}</div>
                  <div>
                    <h4>{review.user}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? '#f59e0b' : 'none'}
                      color={i < review.rating ? '#f59e0b' : '#9ca3af'}
                    />
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
