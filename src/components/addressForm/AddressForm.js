import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './AddressForm.css';

const initialForm = {
  name: '',
  contactNumber: '',
  city: '',
  landmark: '',
  street: '',
  state: '',
  zipcode: '',
};

const validate = (form) => {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!form.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{6,15}$/.test(form.contactNumber.trim())) {
    errors.contactNumber = 'Enter a valid contact number';
  }
  if (!form.city.trim()) {
    errors.city = 'City is required';
  }
  if (!form.street.trim()) {
    errors.street = 'Street is required';
  }
  if (!form.state.trim()) {
    errors.state = 'State is required';
  }
  if (!form.zipcode.trim()) {
    errors.zipcode = 'Zipcode is required';
  } else if (!/^\d{6}$/.test(form.zipcode.trim())) {
    errors.zipcode = 'Zipcode must be 6 digits';
  }
  return errors;
};

function AddressForm({ onSave, saving }) {
  const [form, setForm] = useState(initialForm);
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
    onSave({
      name: form.name.trim(),
      contactNumber: form.contactNumber.trim(),
      city: form.city.trim(),
      landmark: form.landmark.trim(),
      street: form.street.trim(),
      state: form.state.trim(),
      zipcode: form.zipcode.trim(),
    });
  };

  return (
    <form className="address-form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.name}
        onChange={(event) => setField('name', event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        label="Contact Number"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.contactNumber}
        onChange={(event) => setField('contactNumber', event.target.value)}
        error={Boolean(errors.contactNumber)}
        helperText={errors.contactNumber}
      />
      <TextField
        label="Street"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.street}
        onChange={(event) => setField('street', event.target.value)}
        error={Boolean(errors.street)}
        helperText={errors.street}
      />
      <TextField
        label="Landmark"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.landmark}
        onChange={(event) => setField('landmark', event.target.value)}
      />
      <TextField
        label="City"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.city}
        onChange={(event) => setField('city', event.target.value)}
        error={Boolean(errors.city)}
        helperText={errors.city}
      />
      <TextField
        label="State"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.state}
        onChange={(event) => setField('state', event.target.value)}
        error={Boolean(errors.state)}
        helperText={errors.state}
      />
      <TextField
        label="Zipcode"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small"
        value={form.zipcode}
        onChange={(event) => setField('zipcode', event.target.value)}
        error={Boolean(errors.zipcode)}
        helperText={errors.zipcode}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={Boolean(saving)}
        className="address-form-submit"
      >
        Save Address
      </Button>
    </form>
  );
}

export default AddressForm;
