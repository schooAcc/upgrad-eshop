import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from '../AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
  }, [location.search]);

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(location.search);
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    const queryString = params.toString();
    history.push({
      pathname: '/products',
      search: queryString ? `?${queryString}` : '',
    });
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <div className="navbar-logo">
          <IconButton
            component={Link}
            to={isLoggedIn ? '/products' : '/login'}
            color="inherit"
            className="navbar-logo-button"
            aria-label="upGrad Eshop logo"
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" className="navbar-title">
            upGrad Eshop
          </Typography>
        </div>

        {isLoggedIn && (
          <form className="navbar-search" onSubmit={handleSearch}>
            <div className="navbar-search-box">
              <div className="navbar-search-icon">
                <SearchIcon fontSize="small" />
              </div>
              <InputBase
                placeholder="Search products"
                className="navbar-search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                inputProps={{ 'aria-label': 'search products' }}
              />
            </div>
          </form>
        )}

        <div className="navbar-actions">
          {!isLoggedIn && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </React.Fragment>
          )}
          {isLoggedIn && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/products">
                Home
              </Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/products/add">
                  Add Product
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </React.Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
