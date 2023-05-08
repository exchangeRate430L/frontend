import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "../UserCredentialsDialog/UserCredentialsDialog.css";
// Component that presents a dialog to collect credentials from the user
export default function PriceAlertDialog({
  open,
  onSubmit,
  onClose,
  title,
  submitText,
}) {
  let [valueCeiling, setValueCeiling] = useState("");
  let [valueFloor, setValueFloor] = useState("");


  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        <div className="form-item">
          <TextField
            fullWidth
            label="Ceiling"
            type="number"
            value={valueCeiling}
            onChange={({ target: { value } }) => setValueCeiling(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Floor"
            type="number"
            value={valueFloor}
            onChange={({ target: { value } }) => setValueFloor(value)}
          />
        </div>

        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit(valueCeiling, valueFloor)}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}