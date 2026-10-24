import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./common/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
  },
  getErrorMessage: () => 'Something went wrong. Please try again.',
}));

test('renders sign in page on load', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0);
  expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
  expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
});

test('renders login and signup links in navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
  expect(screen.getByLabelText(/upgrad eshop logo/i)).toBeInTheDocument();
});
