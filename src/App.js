import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from './common/AuthContext';
import Navbar from './common/Navbar/Navbar';
import Categories from './common/Categories/Categories';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';
import Products from './screens/products/Products';
import ProductDetails from './screens/productDetails/ProductDetails';
import Orders from './screens/orders/Orders';
import AddProduct from './screens/addProduct/AddProduct';
import ModifyProduct from './screens/modifyProduct/ModifyProduct';

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
};

function App() {
  const [user, setUser] = useState(loadUser);

  const login = (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    setUser(value);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isLoggedIn = Boolean(user && user.token);
  const isAdmin = isLoggedIn && user.role === 'ADMIN';
  const showCategories = isLoggedIn;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
      <div className="app-shell">
        <Navbar />
        {showCategories && <Categories />}
        <div className="app-content">
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (isLoggedIn ? <Redirect to="/products" /> : <Login />)}
            />
            <Route
              exact
              path="/signup"
              render={() => (isLoggedIn ? <Redirect to="/products" /> : <Signup />)}
            />
            <Route exact path="/" render={() => <Redirect to="/products" />} />
            <PrivateRoute exact path="/products" component={Products} />
            <PrivateRoute exact path="/products/add" component={AddProduct} isAdminRoute />
            <PrivateRoute exact path="/products/:id" component={ProductDetails} />
            <PrivateRoute
              exact
              path="/products/:id/edit"
              component={ModifyProduct}
              isAdminRoute
            />
            <PrivateRoute exact path="/orders/create" component={Orders} />
            <Route render={() => <Redirect to="/products" />} />
          </Switch>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
