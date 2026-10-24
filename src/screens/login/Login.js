import React, { useContext, useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import { readLoginResponse } from '../../common/auth';
import AuthContext from '../../common/AuthContext';
import Message from '../../common/Message/Message';
import './Login.css';

const validate = (form) => {
  const errors = {};
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

function Login() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [message, setMessage] = useState((location.state && location.state.message) || '');
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
      const response = await api.post('auth/signin', {
        username: form.email.trim(),
        password: form.password,
      });
      const auth = readLoginResponse(response);
      if (!auth.token) {
        setServerError('Unable to sign in. Please try again.');
        setSubmitting(false);
        return;
      }
      login({
        token: auth.token,
        role: auth.role,
        email: form.email.trim(),
        firstName: auth.firstName,
      });
      history.push('/products');
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
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
              Sign In
            </Button>
            <Typography variant="body2" className="auth-link">
              New to upGrad Eshop? <Link to="/signup">Sign Up</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
      <Message message={message} severity="success" onClose={() => setMessage('')} />
    </div>
  );
}

export default Login;
