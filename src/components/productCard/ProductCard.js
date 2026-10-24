import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, isAdmin, onDelete }) {
  const history = useHistory();
  const id = product.id || product._id;

  return (
    <Card className="product-card">
      <CardContent>
        <Typography variant="h6" className="product-card-name">
          {product.name}
        </Typography>
        <Typography variant="h6" className="product-card-price">
          &#8377;{Number(product.price).toFixed(2)}
        </Typography>
        <Typography variant="body2" className="product-card-meta">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" className="product-card-meta">
          Manufacturer: {product.manufacturer}
        </Typography>
        <Typography variant="body2" className="product-card-meta">
          Available Items: {product.availableItems}
        </Typography>
        <Typography variant="body2" className="product-card-description">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions className="product-card-actions">
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => history.push(`/products/${id}`)}
        >
          Buy
        </Button>
        {isAdmin && (
          <div className="product-card-admin-actions">
            <IconButton
              aria-label="modify product"
              size="small"
              color="primary"
              onClick={() => history.push(`/products/${id}/edit`)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete product"
              size="small"
              color="secondary"
              onClick={() => onDelete(product)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
