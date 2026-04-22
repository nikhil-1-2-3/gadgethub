import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { fadeIn } from '../animations/pageTransitions';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
    sortBy: 'createdAt'
  });

  useEffect(() => {
    fetchProducts();
  }, [category, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products', {
        params: {
          category: category.charAt(0).toUpperCase() + category.slice(1),
          ...filters
        }
      });
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="category-page" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="category-content">
        <aside className="filter-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Price Range</label>
            <input
              type="range"
              min="0"
              max="200000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
            <span>₹0 - ₹{filters.maxPrice.toLocaleString()}</span>
          </div>
          <div className="filter-group">
            <label>Minimum Rating</label>
            <select
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
            >
              <option value="0">All</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="createdAt">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>
        <div className="products-section">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
