import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../api';
import './Categories.css';

const readCategories = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  return data
    .map((item) => (typeof item === 'string' ? item : item && (item.name || item.category)))
    .filter(Boolean);
};

function Categories() {
  const history = useHistory();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const params = new URLSearchParams(location.search);
  const selected = params.get('category') || 'All';

  useEffect(() => {
    api
      .get('products/categories')
      .then((response) => setCategories(readCategories(response.data)))
      .catch(() => setCategories([]));
  }, []);

  const selectCategory = (value) => {
    if (!value) {
      return;
    }
    const nextParams = new URLSearchParams(location.search);
    if (value === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', value);
    }
    const queryString = nextParams.toString();
    history.push({
      pathname: '/products',
      search: queryString ? `?${queryString}` : '',
    });
  };

  return (
    <div className="categories-bar">
      <ToggleButtonGroup
        exclusive
        value={selected}
        onChange={(event, value) => selectCategory(value)}
        className="categories-group"
      >
        <ToggleButton value="All" className="category-toggle">
          All
        </ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category} value={category} className="category-toggle">
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default Categories;
