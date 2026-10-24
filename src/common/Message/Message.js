import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './Message.css';

function Message({ message, severity, onClose }) {
  if (!message) {
    return null;
  }
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity || 'success'} className="message-alert">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Message;
