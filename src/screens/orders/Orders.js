import React, { useEffect, useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import api, { getErrorMessage } from '../../common/api';
import ProductSummary from '../../components/productSummary/ProductSummary';
import AddressForm from '../../components/addressForm/AddressForm';
import './Orders.css';

const steps = ['Product Details', 'Address Details', 'Order Details'];

const readAddresses = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.content)) {
    return data.content;
  }
  return [];
};

const getAddressId = (address) => String(address.id || address._id || '');

function Orders() {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get('productId');
  const quantity = Math.max(parseInt(query.get('quantity'), 10) || 1, 1);

  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState('');
  const [addressError, setAddressError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const loadAddresses = () =>
    api
      .get('addresses')
      .then((response) => setAddresses(readAddresses(response.data)))
      .catch(() => setAddresses([]));

  useEffect(() => {
    api
      .get(`products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((requestError) => setError(getErrorMessage(requestError)));
    loadAddresses();
  }, [productId]);

  const handleSaveAddress = async (values) => {
    setSaving(true);
    setError('');
    try {
      const response = await api.post('addresses', values);
      await loadAddresses();
      const saved = response.data;
      if (saved) {
        setAddressId(getAddressId(saved));
        setAddressError('');
      }
      setShowAddressForm(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 1 && !addressId) {
      setAddressError('Please select address!');
      return;
    }
    setAddressError('');
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setAddressError('');
    setActiveStep((step) => step - 1);
  };

  const handlePlaceOrder = async () => {
    setSaving(true);
    setError('');
    try {
      await api.post('orders', {
        quantity,
        product: productId,
        address: addressId,
      });
      setConfirmed(true);
      setTimeout(() => {
        history.push('/products', { message: 'Order placed successfully!' });
      }, 1500);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setSaving(false);
    }
  };

  const selectedAddress = addresses.find(
    (address) => getAddressId(address) === String(addressId)
  );

  const getStepContent = (step) => {
    if (step === 0) {
      if (!product) {
        return (
          <Typography variant="body1" className="order-loading">
            Loading product details...
          </Typography>
        );
      }
      return <ProductSummary product={product} quantity={quantity} />;
    }
    if (step === 1) {
      return (
        <div className="order-address-step">
          <TextField
            select
            label="Select Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={addressId}
            onChange={(event) => {
              setAddressId(event.target.value);
              setAddressError('');
            }}
            error={Boolean(addressError)}
            helperText={addressError}
          >
            {addresses.length === 0 && (
              <MenuItem value="">No saved addresses</MenuItem>
            )}
            {addresses.map((address) => (
              <MenuItem key={getAddressId(address)} value={getAddressId(address)}>
                {address.name}, {address.city} - {address.zipcode}
              </MenuItem>
            ))}
          </TextField>
          <Button
            color="primary"
            className="address-toggle-button"
            onClick={() => setShowAddressForm((value) => !value)}
          >
            {showAddressForm ? 'Hide Address Form' : 'Add New Address'}
          </Button>
          {(showAddressForm || addresses.length === 0) && (
            <AddressForm onSave={handleSaveAddress} saving={saving} />
          )}
        </div>
      );
    }
    return (
      <div className="order-review">
        <ProductSummary product={product} quantity={quantity} />
        {selectedAddress && (
          <div className="order-review-address">
            <Typography variant="subtitle1" className="order-review-heading">
              Shipping Address
            </Typography>
            <Typography variant="body2">{selectedAddress.name}</Typography>
            <Typography variant="body2">{selectedAddress.street}</Typography>
            <Typography variant="body2">
              {selectedAddress.city}, {selectedAddress.state} -{' '}
              {selectedAddress.zipcode}
            </Typography>
            <Typography variant="body2">
              Contact Number: {selectedAddress.contactNumber}
            </Typography>
            {selectedAddress.landmark && (
              <Typography variant="body2">
                Landmark: {selectedAddress.landmark}
              </Typography>
            )}
          </div>
        )}
        {confirmed && (
          <Typography variant="h6" className="order-confirmed">
            Your order is confirmed.
          </Typography>
        )}
      </div>
    );
  };

  return (
    <div className="order-page">
      <Typography variant="h5" className="page-title">
        Create Order
      </Typography>
      <Stepper activeStep={activeStep} className="order-stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="order-step-content">{getStepContent(activeStep)}</div>
      {error && (
        <Typography color="error" className="order-error">
          {error}
        </Typography>
      )}
      <div className="order-actions">
        <Button disabled={activeStep === 0 || saving} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === 0 && !product}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            disabled={saving || confirmed}
          >
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
}

export default Orders;
