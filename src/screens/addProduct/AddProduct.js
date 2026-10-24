import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import ProductForm from '../../components/productForm/ProductForm';
import './AddProduct.css';

const readCategories = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data
    .map((item) => (typeof item === 'string' ? item : item && (item.name || item.category)))
    .filter(Boolean);
};

function AddProduct() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('products/categories')
      .then((response) => setCategories(readCategories(response.data)))
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      await api.post('products', values);
      history.push('/products', {
        message: `Product ${values.name} added successfully`,
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setSubmitting(false);
    }
  };

  return (
    <div className="product-page">
      <Typography variant="h5" className="page-title">
        Add Product
      </Typography>
      {error && (
        <Typography color="error" className="product-page-error">
          {error}
        </Typography>
      )}
      <ProductForm
        categories={categories}
        submitLabel="Add Product"
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddProduct;
