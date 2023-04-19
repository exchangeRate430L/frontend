import { useState } from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserCredentialsDialog from "./UserCredentialsDialog/UserCredentialsDialog";
import { Snackbar, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { getUserToken, saveUserToken, clearUserToken } from "./localStorage";
import { useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./App.css";
var SERVER_URL = "http://127.0.0.1:5000";
var id = 0;
var booleanTrans = 0;

const States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
};

function App() {
  let [buyUsdRate, setBuyUsdRate] = useState(null);
  let [sellUsdRate, setSellUsdRate] = useState(null);
  let [lbpInput, setLbpInput] = useState("");
  let [usdInput, setUsdInput] = useState("");
  let [transactionType, setTransactionType] = useState("usd-to-lbp");
  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [lbpAmount, setLbpAmount] = useState("");
  let [usdAmount, setUsdAmount] = useState("");
  let [userTransactions, setUserTransactions] = useState([]);
  let [viewCalculator, setViewCalculator] = useState(false);
  let [viewInsights, setViewInsights] = useState(false);
  let [numBuy, setNumBuy] = useState(0);
  let [numSell, setNumSell] = useState(0);
  let [changeBuyUsdRate, setChangeBuyUsdRate] = useState(0);
  let [changeSellUsdRate, setChangeSellUsdRate] = useState(0);

  function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBuyUsdRate(data.usd_to_lbp);
        setSellUsdRate(data.lbp_to_usd);
        setNumBuy(data.num_buy);
        setNumSell(data.num_sell);
        setChangeBuyUsdRate(data.avg_change_lbp_usd);
        setChangeSellUsdRate(data.avg_change_usd_lbp);
        id = data.id;
      });
  }
  useEffect(fetchRates, []);
  function addItem() {
    if (lbpInput !== 0 && usdInput !== 0) {
      if (transactionType === "usd-to-lbp") {
        booleanTrans = 1;
      } else {
        booleanTrans = 0;
      }

      const data = {
        id: parseInt(id + 1),
        usd_amount: parseInt(usdInput),
        lbp_amount: parseInt(lbpInput),
        usd_to_lbp: booleanTrans,
      };

      console.log(data);
      if (userToken !== null) {
        fetch(`${SERVER_URL}/transaction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchRates();
            fetchUserTransactions();
          })

          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        fetch(`${SERVER_URL}/transaction`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchRates();
          })

          .catch((error) => {
            console.error("Error:", error);
          });
      }

      setLbpInput("");
      setUsdInput("");
    } else {
      console.log("fill values!");
    }
  }
  function logout() {
    setUserToken(null);
    clearUserToken();
  }
  function login(username, password) {
    return fetch(`${SERVER_URL}/authentication`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
        saveUserToken(body.token);
      });
  }
  function createUser(username, password) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    }).then((response) => login(username, password));
  }
  const fetchUserTransactions = useCallback(() => {
    fetch(`${SERVER_URL}/transaction`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((transactions) => setUserTransactions(transactions));
  }, [userToken]);
  useEffect(() => {
    if (userToken) {
      fetchUserTransactions();
    }
  }, [fetchUserTransactions, userToken]);
  return (
    <div className="App">
      <div className="header">
        <AppBar position="static">
          <Toolbar classes={{ root: "nav" }}>
            <Typography variant="h5">LBP Exchange Tool</Typography>
            {userToken !== null ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_CREATION)}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_LOG_IN)}
                >
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>

      <UserCredentialsDialog
        open={authState === States.USER_CREATION}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={createUser}
        submitText="Sign-Up"
        title="Register"
      />

      <UserCredentialsDialog
        open={authState === States.USER_LOG_IN}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={login}
        submitText="Log in"
        title="Welcome!"
      />

      <Snackbar
        elevation={6}
        variant="filled"
        open={authState === States.USER_AUTHENTICATED}
        autoHideDuration={2000}
        onClose={() => setAuthState(States.PENDING)}
      >
        <Alert severity="success">Success</Alert>
      </Snackbar>

      <div className="wrapper">
        <h2>Today's Exchange Rate</h2>
        <p>LBP to USD Exchange Rate</p>
        <h3>
          Buy USD: <span id="buy-usd-rate">{buyUsdRate}</span>
        </h3>
        <h3>
          Sell USD: <span id="sell-usd-rate">{sellUsdRate}</span>
        </h3>
        <hr />
        {/* Here goes the calculator UI */}
        <Button
          color="inherit"
          onClick={() => setViewCalculator(!viewCalculator)}
        >
          Calculator
        </Button>
        <Button color="inherit" onClick={() => setViewInsights(!viewInsights)}>
          Insights
        </Button>
      </div>

      {viewCalculator === true && (
        <div className="wrapper">
          <h2>Transaction Claculator:</h2>
          <h3>
            LBP to USD amount ={" "}
            <span id="from-lbp-to-usd">{lbpAmount / buyUsdRate}</span>
          </h3>
          <form name="calculator-entry">
            <div className="amount-input">
              <label htmlFor="lbp-amount">LBP Amount</label>
              <TextField
                id="lbp-amount"
                type="number"
                value={lbpAmount}
                onChange={(e) => setLbpAmount(e.target.value)}
              />
            </div>
          </form>
          <hr />
          <h3>
            USD to LBP amount ={" "}
            <span id="from-usd-to-lbp">{usdAmount * sellUsdRate}</span>
          </h3>
          <form name="calculator-entry">
            <div className="amount-input">
              <label htmlFor="usd-amount">USD amount</label>
              <TextField
                id="usd-amount"
                type="number"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}
      {viewInsights === true && (
        <div className="wrapper">
          <h2>Statistics about Rates</h2>
          <h3>
            number of buy USD Transactions:{" "}
            <span id="num-buy-usd">{numBuy}</span>
          </h3>
          <h3>
            number of sell USD Transactions:{" "}
            <span id="num-sell-usd">{numSell}</span>
          </h3>
          <h3>
            buy USD price change:{" "}
            <span id="num-buy-usd">{buyUsdRate - changeBuyUsdRate}</span>
          </h3>
          <h3>
            sell USD price change:{" "}
            <span id="num-sell-usd">{sellUsdRate - changeSellUsdRate}</span>
          </h3>
          {/* <h1>My Bar Chart</h1>
            <BarChart/> */}
        </div>
      )}
      {userToken !== null && (
        <div className="wrapper">
        <h2>Record a recent transaction</h2>
        <form name="transaction-entry">
          <div className="amount-input">
            <label htmlFor="lbp-amount">LBP Amount</label>
            <TextField
              id="lbp-amount"
              type="number"
              value={lbpInput}
              onChange={(e) => setLbpInput(e.target.value)}
            />
          </div>
          <div className="amount-input">
            <label htmlFor="usd-amount">USD amount</label>
            <TextField
              id="usd-amount"
              type="number"
              value={usdInput}
              onChange={(e) => setUsdInput(e.target.value)}
            />
          </div>
        </form>
        <select
          id="transaction-type"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="usd-to-lbp">USD to LBP</option>
          <option value="lbp-to-usd">LBP to USD</option>
        </select>
        <Button
          id="add-button"
          className="button"
          type="button"
          onClick={addItem}
        >
          Add
        </Button>
      </div>
      )}
      
      {userToken && (
        <div className="wrapper">
          <Typography variant="h5">Your Transactions</Typography>
          <DataGrid
            columns={[
              { field: "usd_amount", headerName: "usd_amount" },
              { field: "lbp_amount", headerName: "lbp_amount" },
              { field: "usd_to_lbp", headerName: "usd_to_lbp" },
              { field: "added_date", headerName: "added_date" },
              { field: "user_id", headerName: "user_id" },
            ]}
            rows={userTransactions}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </div>
      )}
      <script src="script.js"></script>
    </div>
  );
}

export default App;
