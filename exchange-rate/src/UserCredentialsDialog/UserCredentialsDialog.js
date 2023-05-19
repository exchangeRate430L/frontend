import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./UserCredentialsDialog.css";

export default function UserCredentialsDialog({
  open,
  onSubmit,
  onClose,
  title,
  submitText,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setUsername(sanitizedValue);
  };

  const handlePasswordChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setPassword(sanitizedValue);
  };

  const handleSubmit = () => {
    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);
    onSubmit(sanitizedUsername, sanitizedPassword);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        <div className="form-item">
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}

