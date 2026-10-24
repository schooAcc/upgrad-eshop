import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import ProductSummary from '../../components/productSummary/ProductSummary';
import placeholderImage from '../../assets/product-placeholder.svg';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((requestError) => setError(getErrorMessage(requestError)));
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    const numberValue = Number(value);
    if (!value || isNaN(numberValue) || numberValue < 1) {
      setQuantityError('Quantity must be at least 1');
    } else if (product && numberValue > Number(product.availableItems)) {
      setQuantityError('Quantity exceeds available items');
    } else {
      setQuantityError('');
    }
  };

  const handlePlaceOrder = () => {
    const numberValue = Number(quantity);
    if (!numberValue || numberValue < 1) {
      setQuantityError('Quantity must be at least 1');
      return;
    }
    if (product && numberValue > Number(product.availableItems)) {
      setQuantityError('Quantity exceeds available items');
      return;
    }
    history.push(`/orders/create?productId=${id}&quantity=${numberValue}`);
  };

  return (
    <div className="product-details-page">
      <Typography variant="h5" className="page-title">
        Product Details
      </Typography>
      {error && (
        <Typography color="error" className="details-error">
          {error}
        </Typography>
      )}
      {product && (
        <div className="product-details-layout">
          <div className="product-details-image">
            <img
              src={product.image || placeholderImage}
              alt={product.name || 'Product image not available'}
              className="product-details-img"
            />
          </div>
          <div className="product-details-info">
            <ProductSummary product={product} />
            <div className="product-details-quantity">
              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                size="small"
                value={quantity}
                onChange={handleQuantityChange}
                error={Boolean(quantityError)}
                helperText={quantityError}
                inputProps={{ min: 1 }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
      {!product && !error && (
        <Typography variant="body1" className="products-empty">
          Loading product details...
        </Typography>
      )}
    </div>
  );
}

export default ProductDetails;
