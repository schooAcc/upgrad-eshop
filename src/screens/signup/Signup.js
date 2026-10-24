import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import './Signup.css';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  contactNumber: '',
};

const validate = (form) => {
  const errors = {};
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!form.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirm your password';
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  if (!form.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{6,15}$/.test(form.contactNumber.trim())) {
    errors.contactNumber = 'Enter a valid contact number';
  }
  return errors;
};

function Signup() {
  const history = useHistory();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }
    setServerError('');
    setSubmitting(true);
    try {
      await api.post('auth/signup', {
        email: form.email.trim(),
        password: form.password,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        contactNumber: form.contactNumber.trim(),
      });
      history.push('/login', {
        message: 'Signup successful! Please sign in to continue.',
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <CardContent>
          <Typography variant="h5" className="auth-title">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.firstName}
              onChange={(event) => setField('firstName', event.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.lastName}
              onChange={(event) => setField('lastName', event.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.email}
              onChange={(event) => setField('email', event.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.password}
              onChange={(event) => setField('password', event.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.confirmPassword}
              onChange={(event) => setField('confirmPassword', event.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
            <TextField
              label="Contact Number"
              type="tel"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.contactNumber}
              onChange={(event) => setField('contactNumber', event.target.value)}
              error={Boolean(errors.contactNumber)}
              helperText={errors.contactNumber}
            />
            {serverError && (
              <Typography color="error" className="auth-error">
                {serverError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={submitting}
              className="auth-submit"
            >
              Sign Up
            </Button>
            <Typography variant="body2" className="auth-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
