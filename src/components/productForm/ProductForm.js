import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import './ProductForm.css';

const createForm = (product) => ({
  name: (product && product.name) || '',
  category: (product && product.category) || '',
  price: product && product.price !== undefined && product.price !== null ? String(product.price) : '',
  description: (product && product.description) || '',
  manufacturer: (product && product.manufacturer) || '',
  availableItems:
    product && product.availableItems !== undefined && product.availableItems !== null
      ? String(product.availableItems)
      : '',
});

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!String(form.category).trim()) {
    errors.category = 'Category is required';
  }
  if (!String(form.price).trim()) {
    errors.price = 'Price is required';
  } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  }
  if (!form.description.trim()) {
    errors.description = 'Description is required';
  }
  if (!form.manufacturer.trim()) {
    errors.manufacturer = 'Manufacturer is required';
  }
  if (!String(form.availableItems).trim()) {
    errors.availableItems = 'Available items is required';
  } else if (!Number.isInteger(Number(form.availableItems)) || Number(form.availableItems) < 0) {
    errors.availableItems = 'Available items must be a whole number';
  }
  return errors;
};

function ProductForm({ product, categories, submitLabel, submitting, onSubmit }) {
  const [form, setForm] = useState(() => createForm(product));
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }
    onSubmit({
      name: form.name.trim(),
      category: String(form.category).trim(),
      price: Number(form.price),
      description: form.description.trim(),
      manufacturer: form.manufacturer.trim(),
      availableItems: Number(form.availableItems),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={(event) => setField('name', event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <Autocomplete
        freeSolo
        options={categories}
        value={form.category}
        inputValue={form.category}
        onInputChange={(event, value) => setField('category', value || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            variant="outlined"
            margin="normal"
            error={Boolean(errors.category)}
            helperText={errors.category || 'Choose an existing category or type a new one'}
          />
        )}
      />
      <TextField
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.price}
        onChange={(event) => setField('price', event.target.value)}
        error={Boolean(errors.price)}
        helperText={errors.price}
        inputProps={{ min: 0, step: '0.01' }}
      />
      <TextField
        label="Manufacturer"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.manufacturer}
        onChange={(event) => setField('manufacturer', event.target.value)}
        error={Boolean(errors.manufacturer)}
        helperText={errors.manufacturer}
      />
      <TextField
        label="Available Items"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={form.availableItems}
        onChange={(event) => setField('availableItems', event.target.value)}
        error={Boolean(errors.availableItems)}
        helperText={errors.availableItems}
        inputProps={{ min: 0, step: '1' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={form.description}
        onChange={(event) => setField('description', event.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={Boolean(submitting)}
        className="product-form-submit"
      >
        {submitLabel}
      </Button>
    </form>
  );
}

export default ProductForm;
