import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "../UserCredentialsDialog/UserCredentialsDialog.css";
// Component that presents a dialog to collect credentials from the user
export default function BuyDialog({
  open,
  onSubmit,
  onClose,
  title,
  submitText,
  idText
}) {
  let [usdInput, setUsdInput] = useState("");
  let [userId, setUserId] = useState("");


  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        <div className="form-item">
          <TextField
            fullWidth
            label={idText}
            type="number"
            value={userId}
            onChange={({ target: { value } }) => setUserId(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Usd"
            type="number"
            value={usdInput}
            onChange={({ target: { value } }) => setUsdInput(value)}
          />
        </div>

        <Button
        className="button"
          color="primary"
          variant="contained"
          onClick={() => onSubmit(userId, usdInput)}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}