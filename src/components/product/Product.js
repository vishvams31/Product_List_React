import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-thumbnail" style={{ backgroundImage: `url(${product.thumbnail})` }} />
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-brand">Brand: {product.brand}</p>
                <p className="product-rating">Rating: {product.rating} /10</p>
                <p className="product-price">Price: {product.price}</p>
                <p className="product-discount">Discount: {product.discountPercentage}%</p>
            </div>
        </Link>
    );
};

export default Product;
