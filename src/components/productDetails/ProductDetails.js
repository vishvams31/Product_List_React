import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../services/Service';
import './productDetails.css'; // Adjust the import path as necessary
import Topbar from '../topbar/Topbar'

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProductDetails(id);
            setProduct(data);
        };

        fetchData();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <Topbar />
            <div className="product-details">
                <div className="carousel">
                    <button onClick={handlePrevImage}>Previous</button>
                    <img src={product.images[currentImageIndex]} alt={`Product Image ${currentImageIndex + 1}`} className="carousel-image" />
                    <button onClick={handleNextImage}>Next</button>
                </div>
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-rating">Rating: {product.rating}</p>
                    <p className="product-price">Price: {product.price}</p>
                    <p className="product-discount">Discount: {product.discountPercentage}%</p>
                    <p className="product-description">About :{product.description}</p>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
