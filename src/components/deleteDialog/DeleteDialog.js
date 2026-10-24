import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import './DeleteDialog.css';

function DeleteDialog({ open, product, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} className="delete-dialog">
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the product {product ? product.name : ''}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
