import React, { useState, useEffect } from 'react';
import Product from '../product/Product'; // Adjust the import path as necessary
import { fetchProducts } from '../../services/Service';
import './productList.css'
const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 8; // Number of products per page

    useEffect(() => {
        const fetchData = async () => {
            const skip = page * limit;
            const response = await fetchProducts(skip, limit);
            const data = await response.products
            console.log(response)
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('API response is not an array:', data);
            }
        };

        fetchData();
    }, [page]);

    return (
        <div className="product-listing">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
            <button onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 0}>
                Previous
            </button>
            <button onClick={() => setPage((prevPage) => prevPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default ProductListing;
