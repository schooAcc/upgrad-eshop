import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import ProductForm from '../../components/productForm/ProductForm';
import './ModifyProduct.css';

const readCategories = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data
    .map((item) => (typeof item === 'string' ? item : item && (item.name || item.category)))
    .filter(Boolean);
};

function ModifyProduct() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((requestError) => setError(getErrorMessage(requestError)));
    api
      .get('products/categories')
      .then((response) => setCategories(readCategories(response.data)))
      .catch(() => setCategories([]));
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      await api.put(`products/${id}`, { ...values, id });
      history.push('/products', {
        message: `Product ${values.name} modified successfully`,
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setSubmitting(false);
    }
  };

  return (
    <div className="product-page">
      <Typography variant="h5" className="page-title">
        Modify Product
      </Typography>
      {error && (
        <Typography color="error" className="product-page-error">
          {error}
        </Typography>
      )}
      {product ? (
        <ProductForm
          key={product.id || product._id || id}
          product={product}
          categories={categories}
          submitLabel="Modify Product"
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      ) : (
        !error && (
          <Typography variant="body1" className="product-page-loading">
            Loading product details...
          </Typography>
        )
      )}
    </div>
  );
}

export default ModifyProduct;
