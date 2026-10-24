import React from 'react';
import { Typography } from '@material-ui/core';
import './ProductSummary.css';

function ProductSummary({ product, quantity }) {
  if (!product) {
    return null;
  }
  return (
    <div className="product-summary">
      <Typography variant="h6" className="product-summary-name">
        {product.name}
      </Typography>
      <Typography variant="h6" className="product-summary-price">
        &#8377;{Number(product.price).toFixed(2)}
      </Typography>
      <Typography variant="body2" className="product-summary-meta">
        Category: {product.category}
      </Typography>
      <Typography variant="body2" className="product-summary-meta">
        Manufacturer: {product.manufacturer}
      </Typography>
      <Typography variant="body2" className="product-summary-meta">
        Available Items: {product.availableItems}
      </Typography>
      {quantity !== undefined && quantity !== null && (
        <Typography variant="body2" className="product-summary-meta">
          Quantity: {quantity}
        </Typography>
      )}
      <Typography variant="body2" className="product-summary-description">
        {product.description}
      </Typography>
    </div>
  );
}

export default ProductSummary;
