import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
// import {Link} from "react-router-dom";
import UserCredentialsDialog from "../UserCredentialsDialog/UserCredentialsDialog";
import UserCredentialsDialogRegister from "../UserCredentialsDialog/UserCredentialsDialogRegister";
import { Snackbar, TextField, Tooltip } from "@mui/material";
import { useCallback } from "react";
import Alert from "@mui/material/Alert";
import {
  getUserToken,
  saveUserToken,
  clearUserToken,
  getUserRole,
  saveUserRole,
  clearUserRole,
  clearUserLbpBalance,
  clearUserUsdBalance,
} from "../localStorage";
import ChartHour from "./chartHourPage";
import ChartDay from "./chartDayPage";
import ChartMin from "./chartMinPage";
import "../App.css";
import BuyDialog from "./buyDialog";
import emailjs from "emailjs-com";

var SERVER_URL = "http://127.0.0.1:5000";
var id = 0;
var booleanTrans = 0;

const States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
  BUY: "BUY",
  SELL: "SELL",
};

const HomeScreen = () => {
  let [buyUsdRate, setBuyUsdRate] = useState(null);
  let [sellUsdRate, setSellUsdRate] = useState(null);
  let [lbpInput, setLbpInput] = useState("");
  let [usdInput, setUsdInput] = useState("");
  let [transactionType, setTransactionType] = useState("usd-to-lbp");
  let [userToken, setUserToken] = useState(getUserToken());
  // eslint-disable-next-line
  let [userRole, setUserRole] = useState(getUserRole());
  let [authState, setAuthState] = useState(States.PENDING);
  let [lbpAmount, setLbpAmount] = useState("");
  let [usdAmount, setUsdAmount] = useState("");
  let [viewCalculator, setViewCalculator] = useState(false);
  let [viewInsights, setViewInsights] = useState(false);
  let [numBuy, setNumBuy] = useState(0);
  let [numSell, setNumSell] = useState(0);
  let [changeBuyUsdRate, setChangeBuyUsdRate] = useState(0);
  let [changeSellUsdRate, setChangeSellUsdRate] = useState(0);
  let [dataChartHour, setDataChartHour] = useState([]);
  let [dataChartDay, setDataChartDay] = useState([]);
  let [viewDay, setViewDay] = useState(true);
  let [viewHour, setViewHour] = useState(false);
  let [viewMin, setViewMin] = useState(false);
  let [userName, setUserName] = useState("");
  let [userTransaction, setUserTransaction] = useState("");
  let [viewNumOfTrans, setViewNumOfTrans] = useState(false);
  let [viewChange, setViewChange] = useState(false);
  let [userEmail, setUserEmail] = useState("");
  let [alertView, setAlertView] = useState(false);

  const getBalance = useCallback(() => {
    fetch(`${SERVER_URL}/balance`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((balance) => {
        setUserEmail(balance.user_email);
      });
  }, [userToken]);
  useEffect(() => {
    if (userToken) {
      getBalance();
    }
  }, [getBalance, userToken]);

  function sendEmail(to_email, message) {
    const templateParams = {
      to_email,
      message,
    };

    emailjs
      .send(
        "service_w12t0fb",
        "template_0jlr076",
        templateParams,
        "ej7YxNe85ZhDS9bax"
      )
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email", err);
      });
  }

  function handleClick(button) {
    if (button === "day") {
      setViewDay(true);
      setViewHour(false);
      setViewMin(false);
    }
    if (button === "hour") {
      setViewHour(true);
      setViewDay(false);
      setViewMin(false);
    }
    if (button === "min") {
      setViewMin(true);
      setViewHour(false);
      setViewDay(false);
    }
  }
  function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBuyUsdRate(data.usd_to_lbp);
        setSellUsdRate(data.lbp_to_usd);
        setNumBuy(data.num_buy);
        setNumSell(data.num_sell);
        setChangeBuyUsdRate(data.change_lbp_usd);
        setChangeSellUsdRate(data.change_usd_lbp);
        setDataChartHour(data.combined_data_hour);
        setDataChartDay(data.combined_data_day);
        id = data.id;
      });
  }
  useEffect(fetchRates, []);

  function alert() {
    fetch(`${SERVER_URL}/exchangeRate`)
      .then((response) => response.json())
      .then((data) => {
        setChangeBuyUsdRate(data.change_lbp_usd);
        setChangeSellUsdRate(data.change_usd_lbp);

        if (data.change_lbp_usd > 1000) {
          sendEmail(userEmail, "Increase in LBP to USD!");
        } else if (data.change_lbp_usd < -1000) {
          sendEmail(userEmail, "Decrease in LBP to USD!");
        }
        if (data.change_usd_lbp > 1000) {
          sendEmail(userEmail, "Increase in USD to LBP!");
        } else if (data.change_usd_lbp < -1000) {
          sendEmail(userEmail, "Decrease in USD to LBP!");
        }
      });
  }

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
        to_user_id: parseInt(userTransaction),
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
      setUserTransaction("");
    } else {
      console.log("fill values!");
    }
  }
  function buy(userId, usdInput) {
    const data = {
      id: parseInt(id + 1),
      usd_amount: parseInt(usdInput),
      lbp_amount: parseInt(buyUsdRate) * parseInt(usdInput),
      usd_to_lbp: 0,
      to_user_id: parseInt(userId),
    };
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
        console.log("Success buy:", data);
        fetchRates();
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function sell(userId, usdInput) {
    const data = {
      id: parseInt(id + 1),
      usd_amount: parseInt(usdInput),
      lbp_amount: parseInt(sellUsdRate) * parseInt(usdInput),
      usd_to_lbp: 1,
      to_user_id: parseInt(userId),
    };
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
        console.log("Success sell:", data);
        fetchRates();
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function logout() {
    setUserToken(null);
    setUserRole(null);
    clearUserToken();
    clearUserRole();
    setUserName(null);
    clearUserLbpBalance();
    clearUserUsdBalance();
    setUserEmail(null);
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
        setUserRole(body.role);
        saveUserToken(body.token);
        saveUserRole(body.role);
      });
  }
  function createUser(username, email, password, role, lbpBalance, usdBalance) {
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
        role: role,
        usd_balance: usdBalance,
        lbp_balance: lbpBalance,
        email: email,
      }),
    }).then((response) => {
      login(username, password);
      sendEmail(email, "Thanks for signing up!");
      console.log(response.json());
    });
  }

  return (
    <div className="App">
      <Navbar
        logout={logout}
        States={States}
        setAuthState={setAuthState}
        userToken={userToken}
      />
      <UserCredentialsDialogRegister
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

      <BuyDialog
        open={authState === States.BUY}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={buy}
        submitText="BUY"
        title="Buy USD"
        idText="From: User ID"
      />

      <BuyDialog
        open={authState === States.SELL}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={sell}
        submitText="SELL"
        title="SELL USD"
        idText="To: User Id"
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

      {changeBuyUsdRate > 0 && changeSellUsdRate === 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <Tooltip title="The Price of 1$ in L.L">
            <h3>
              Buy USD: <span id="buy-usd-rate-up">{buyUsdRate}</span>
            </h3>
          </Tooltip>

          <h3>
            Sell USD: <span id="sell-usd-rate">{sellUsdRate}</span>
          </h3>
          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}
      {changeBuyUsdRate < 0 && changeSellUsdRate === 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <h3>
            Buy USD: <span id="buy-usd-rate-down">{buyUsdRate}</span>
          </h3>
          <h3>
            Sell USD: <span id="sell-usd-rate">{sellUsdRate}</span>
          </h3>
          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}

      {changeBuyUsdRate < 0 && changeSellUsdRate < 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <h3>
            Buy USD: <span id="buy-usd-rate-down">{buyUsdRate}</span>
          </h3>
          <h3>
            Sell USD: <span id="sell-usd-rate-down">{sellUsdRate}</span>
          </h3>
          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}

      {changeSellUsdRate < 0 && changeBuyUsdRate === 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <h3>
            Buy USD: <span id="buy-usd-rate">{buyUsdRate}</span>
          </h3>
          <h3>
            Sell USD: <span id="sell-usd-rate-down">{sellUsdRate}</span>
          </h3>
          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}
      {changeSellUsdRate > 0 && changeBuyUsdRate === 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <h3>
            Buy USD: <span id="buy-usd-rate">{buyUsdRate}</span>
          </h3>
          <h3>
            Sell USD: <span id="sell-usd-rate-up">{sellUsdRate}</span>
          </h3>
          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}
      {changeBuyUsdRate === 0 && changeSellUsdRate === 0 && (
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
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>

          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}
      {changeBuyUsdRate > 0 && changeSellUsdRate > 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <Tooltip title="To Buy 1$ in L.L">
            <h3>
              Buy USD: <span id="buy-usd-rate-up">{buyUsdRate}</span>
            </h3>
          </Tooltip>
          <Tooltip title="To Sell 1$ in L.L">
            <h3>
              Sell USD: <span id="sell-usd-rate-up">{sellUsdRate}</span>
            </h3>
          </Tooltip>

          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}
      {changeBuyUsdRate < 0 && changeSellUsdRate > 0 && (
        <div className="wrapper">
          <h2>Today's Exchange Rate</h2>
          <p>LBP to USD Exchange Rate</p>
          <Tooltip title="To Buy 1$ in L.L">
            <h3>
              Buy USD: <span id="buy-usd-rate-down">{buyUsdRate}</span>
            </h3>
          </Tooltip>
          <Tooltip title="To Sell 1$ in L.L">
            <h3>
              Sell USD: <span id="sell-usd-rate-up">{sellUsdRate}</span>
            </h3>
          </Tooltip>

          <hr />
          {/* Here goes the calculator UI */}
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewCalculator(!viewCalculator)}
          >
            Calculator
          </Button>
          <Button
            className="btn"
            color="inherit"
            onClick={() => setViewInsights(!viewInsights)}
          >
            Insights
          </Button>
        </div>
      )}

      {viewCalculator === true && (
        <Tooltip title="Calculate realtime currency exchanges">
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
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      setLbpAmount(e.target.value);
                    } else {
                      setLbpAmount("");
                    }
                  }}
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
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      setUsdAmount(e.target.value);
                    } else {
                      setUsdAmount("");
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </Tooltip>
      )}
      {viewInsights === true && (
        <div className="wrapper">
          <Tooltip title="Latest stats about prices and transactions">
            <h2>Statistics about Rates</h2>
          </Tooltip>
          <Tooltip title="Click to chech number of transactions Today">
            <Button
              className="btn"
              color="inherit"
              onClick={() => setViewNumOfTrans(!viewNumOfTrans)}
            >
              Number of Transactions
            </Button>
          </Tooltip>

          {viewNumOfTrans === true && (
            <div>
              <h3>
                number of buy USD Transactions:{" "}
                <span id="num-buy-usd">{numBuy}</span>
              </h3>
              <h3>
                number of sell USD Transactions:{" "}
                <span id="num-sell-usd">{numSell}</span>
              </h3>
            </div>
          )}
          <hr />
          <Tooltip title="click to chech live price changes">
            <Button
              className="btn"
              color="inherit"
              onClick={() => setViewChange(!viewChange)}
            >
              Changes in Prices
            </Button>
          </Tooltip>

          {viewChange === true && (
            <div>
              <h3>
                buy USD price change:{" "}
                <span id="num-buy-usd">{changeBuyUsdRate}</span>
              </h3>
              <h3>
                sell USD price change:{" "}
                <span id="num-sell-usd">{changeSellUsdRate}</span>
              </h3>
              {userToken!==null && (
                 <div>
                 <Tooltip title="set alert for price changes">
                   <Button onClick={() => alert()} className="custom-button">
                     Alert
                   </Button>
                 </Tooltip>
               </div>
              )}
            </div>
          )}
          <hr />
          {viewDay === true && (
            <div className="wrrapper">
              <h1>Price Change Chart (1D)</h1>
              <ChartDay data={dataChartDay} />
            </div>
          )}
          {viewHour === true && (
            <div>
              <h1>Price Change Chart (1H)</h1>
              <ChartHour data={dataChartHour} />
            </div>
          )}
          {viewMin === true && (
            <div>
              <h1>Price Change Chart (30 Mins)</h1>
              <ChartMin data={dataChartHour} />
            </div>
          )}
          <div className="button-bar">
            <Button
              onClick={() => handleClick("day")}
              className="custom-button"
            >
              1 Day
            </Button>
            <Button
              onClick={() => handleClick("hour")}
              className="custom-button"
            >
              1 Hour
            </Button>
            <Button
              onClick={() => handleClick("min")}
              className="custom-button"
            >
              30 Minutes
            </Button>
          </div>
          {userToken && (
            <div className="button-bar">
              <Tooltip title="buy instantaneosly in the market">
                <Button
                  onClick={() => setAuthState(States.BUY)}
                  className="custom-button-buy"
                >
                  Buy
                </Button>
              </Tooltip>
              <Tooltip title="sell instantaneously in the market">
                <Button
                  onClick={() => setAuthState(States.SELL)}
                  className="custom-button-sell"
                >
                  Sell
                </Button>
              </Tooltip>
              <Tooltip title="alert when price reaches ...">
                <Button onClick={() => alert()} className="custom-button">
                  Alert
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      )}
      {userToken !== null && (
        <div className="wrapper">
          <h2>Record a recent transaction</h2>
          <form name="transaction-entry">
            <div className="amount-input">
              <label htmlFor="to-user">To: User Id</label>
              <TextField
                id="to-user"
                type="number"
                value={userTransaction}
                onChange={(e) => setUserTransaction(e.target.value)}
              />
            </div>
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
            onClick={() => {
              addItem();
            }}
          >
            Add
          </Button>
        </div>
      )}
      <script src="script.js"></script>
    </div>
  );
};

export default HomeScreen;

//used emailjs documentation to send emails
//https://www.emailjs.com/docs/examples/reactjs/
