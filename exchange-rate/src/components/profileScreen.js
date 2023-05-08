import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import {
  getUserToken,
  clearUserToken,
  clearUserRole,
  clearUserLbpBalance,
  clearUserUsdBalance,
  saveUserLbpBalance,
  saveUserUsdBalance,
  getUserLbpBalance,
  getUserUsdBalance,
  getUserRole,
} from "../localStorage";
import { useCallback } from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExportExcel from "./excelexport";
import "../App.css";

var SERVER_URL = "http://127.0.0.1:5000";

var States = {
  PENDING: "PENDING",
  USER_CREATION: "USER_CREATION",
  USER_LOG_IN: "USER_LOG_IN",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
};

const ProfileScreen = () => {
  let [userToken, setUserToken] = useState(getUserToken());
  let [userName, setUserName] = useState("");
  let [usdBalance, setUsdBalance] = useState(getUserUsdBalance());
  let [lbpBalance, setLbpBalance] = useState(getUserLbpBalance());
  let userRole = useState(getUserRole());
  let [userTransactions, setUserTransactions] = useState([]);
  let [userId, setUserId] = useState("");

  function logout() {
    setUserToken(null);
    clearUserToken();
    clearUserRole();
    setUserName(null);
    clearUserLbpBalance();
    clearUserUsdBalance();
  }

  const getBalance = useCallback(() => {
    fetch(`${SERVER_URL}/balance`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((balance) => {
        setUsdBalance(balance.usd_balance);
        setLbpBalance(balance.lbp_balance);
        setUserName(balance.user_name);
        saveUserUsdBalance(balance.usd_balance);
        saveUserLbpBalance(balance.lbp_balance);
        setUserId(balance.user_id);
      });
  }, [userToken]);

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
      getBalance();
    }
  }, [fetchUserTransactions, getBalance, userToken]);

  return (
    <div>
      <Navbar
        logout={logout}
        States={States}
        setAuthState={() => {}}
        userToken={userToken}
      />

      {userToken !== null && (
        <div className="wrapper-div">
          <h2>{userName} </h2>

          <h3>
            <span>USD: ${usdBalance}</span>
            <span>LBP: {lbpBalance}L.L</span>
          </h3>
        </div>
      )}
      {userToken && (
        <div className="wrapper">
          <h2> Personal Information </h2>
          <p>User ID: {userId}</p>
          <p>User Name: {userName}</p>
          <p>Role: {userRole}</p>
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
              { field: "to_user_id", headerName: "to_user_id" },
            ]}
            rows={userTransactions}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
          {userRole === "Staff" && (
            <ExportExcel
              excelData={userTransactions}
              fileName={"Excel Export"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
