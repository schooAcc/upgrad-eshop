import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import AuthContext from '../../common/AuthContext';
import Message from '../../common/Message/Message';
import ProductCard from '../../components/productCard/ProductCard';
import DeleteDialog from '../../components/deleteDialog/DeleteDialog';
import './Products.css';

const readProducts = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.content)) {
    return data.content;
  }
  return [];
};

const getProductId = (product) => product.id || product._id;

const sortProducts = (products, sort) => {
  const list = [...products];
  if (sort === 'priceHigh') {
    list.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === 'priceLow') {
    list.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === 'newest') {
    list.sort((a, b) => {
      const first = new Date(b.dateAdded || b.createdAt || b.updatedAt || 0).getTime();
      const second = new Date(a.dateAdded || a.createdAt || a.updatedAt || 0).getTime();
      if (first === second) {
        return String(getProductId(b) || '').localeCompare(String(getProductId(a) || ''));
      }
      return first - second;
    });
  }
  return list;
};

function Products() {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const category = params.get('category') || 'All';
  const search = params.get('search') || '';
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [message, setMessage] = useState(
    (location.state && location.state.message) || ''
  );
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const query = {};
    if (category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.search = search;
    }
    api
      .get('products', { params: query })
      .then((response) => setProducts(readProducts(response.data)))
      .catch((requestError) => {
        setProducts([]);
        setError(getErrorMessage(requestError));
      });
  }, [category, search]);

  useEffect(() => {
    if (location.state && location.state.message) {
      history.replace({ ...location, state: null });
    }
  }, [history, location]);

  const handleDelete = async () => {
    const product = deleteTarget;
    if (!product) {
      return;
    }
    try {
      await api.delete(`products/${getProductId(product)}`);
      setProducts((prev) => prev.filter((item) => getProductId(item) !== getProductId(product)));
      setDeleteTarget(null);
      setMessage(`Product ${product.name} deleted successfully`);
    } catch (requestError) {
      setDeleteTarget(null);
      setError(getErrorMessage(requestError));
    }
  };

  let visibleProducts = products;
  if (category !== 'All') {
    visibleProducts = visibleProducts.filter(
      (product) => String(product.category).toLowerCase() === category.toLowerCase()
    );
  }
  if (search) {
    visibleProducts = visibleProducts.filter((product) =>
      String(product.name).toLowerCase().includes(search.toLowerCase())
    );
  }
  visibleProducts = sortProducts(visibleProducts, sort);

  return (
    <div className="products-page">
      <div className="products-header">
        <FormControl variant="outlined" size="small" className="products-sort">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            label="Sort By"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
            <MenuItem value="priceLow">Price: Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </div>

      {error && (
        <Typography color="error" className="products-error">
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {visibleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={getProductId(product)}>
            <ProductCard
              product={product}
              isAdmin={isAdmin}
              onDelete={setDeleteTarget}
            />
          </Grid>
        ))}
      </Grid>

      {visibleProducts.length === 0 && !error && (
        <Typography variant="body1" className="products-empty">
          No products found.
        </Typography>
      )}

      <DeleteDialog
        open={Boolean(deleteTarget)}
        product={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      <Message message={message} severity="success" onClose={() => setMessage('')} />
    </div>
  );
}

export default Products;
