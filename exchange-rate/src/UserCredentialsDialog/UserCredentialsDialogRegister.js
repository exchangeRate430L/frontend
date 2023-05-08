import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
// Component that presents a dialog to collect credentials from the user
export default function UserCredentialsDialogRegister({
  open,
  onSubmit,
  onClose,
  title,
  submitText,
}) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [usdBalance, setUsdBalance] = useState(0);
  let [lbpBalance, setLbpBalance] = useState(0);
  let [email, setEmail] = useState("");
  let [alert, setAlert] = useState("");

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
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Email"
            type="text"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Role"
            type="text"
            value={role}
            onChange={({ target: { value } }) => setRole(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="LBP Balance"
            type="number"
            value={lbpBalance}
            onChange={({ target: { value } }) => setLbpBalance(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="USD Balance"
            type="number"
            value={usdBalance}
            onChange={({ target: { value } }) => setUsdBalance(value)}
          />
        </div>
        <select
          id="alert"
          value={alert}
          onChange={(e) => setAlert(e.target.value)}
        >
          <option value="alert">Get Alerts</option>
          <option value="no-alert">Don't Get Alerts</option>
        </select>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            onSubmit(username, email, password, role, lbpBalance, usdBalance, alert)
          }
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}
