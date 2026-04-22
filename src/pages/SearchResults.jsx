import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { fadeIn } from '../animations/pageTransitions';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products', { params: { search: query } });
      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="search-results" initial="hidden" animate="visible" variants={fadeIn}>
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <div className="loading">Searching...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try different search terms</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SearchResults;
