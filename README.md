# Front-end Project Structure and General Architecture

- This folder inlcudes an integrated React app frontend with the backend server.
- The website hosted can read and write data from the central server.
- Visual Studio Code was used for development and Google Chrome for the testing of the application.

The web front-end displays 2 unique pages: the home page and the profile page done by setting states depending on
the user token (logged in or guest) and on the personal information token (displays relevant content and hides the rest). Routing is used for transition between screens.

# Project functionalities:
## Home Page
- The user can see the Exchange rates, use the calculator to calculate transactions, and see insights of transactions and prices.
- The user can login or register
- No profile page, and no transactions can be done if the user is not logged in
- Once the user is logged in, profile button will appear in the nav bar which leads him to his profile screen
- Once the user is logged in, he would be available to perform transactions, as well as instanteneous transcations from below the chart of price flucuation.

## Profile Page
- Only available for logged in users
- Contains user's personal information (id, balance, user name...)
- Contains user's transactions history and user can download an excel sheet with his transactions

# The Home Screen functions:

- function fetchRates(): fetches the returned fetch rates from the backend route and displays them appropriately in the react app. It also gets statistics from the backend such as number of buy and sell transactions as well as the data for charts. Uses the "/exchangeRate" route. 

- function addItem(): adds a recent user transaction to the database through a backend route with the header containing an authorization token (nullable for guest transactions).  Uses the "/transaction" POST route. 

- function buy(userId, usdInput): adds a recent user transaction to the database through a backend route with the header containing an authorization token (no guest transactions). Uses the "/transaction" POST route.

- function sell(userId, usdInput): adds a recent user transaction to the database through a backend route with the header containing an authorization token (no guest transactions). Uses the "/transaction" POST route.

- buy and sell functions are used while the user is watching the chart and wants to do an instantenous transaction.

- functions login(), logout(), and createUser(): handles the login, logout, and register functionalities via unique user tokens.  Use the "/authentication" and "/user"  routes to log in and register respectively. 

- function handlClick(): handles the transition between day, hour, or minutes charts.

- var States: is a map of states of this page.

- var booleanTrans: is a variable that sets the usd-to-lbp option to true or false.

# The Personal Information page functions:

- function logout(): handles the logout functionality.

- const getBalance: uses callBack when a user logs in to fetch the user's USD and LBP balance and displays them appropriately.  Uses the "/balance" route.

- const fetchUserTransactions: uses callBack when a user logs in to fetch the user's individually done transactions on the website and displays them in a table appropriately.  Uses the "/transaction" GET route.

# Structure
- components folder contains all components used in the homeScreen and the profileScreen which are also included there. The use of seperate components is the main thing in React which is not to rerender the whole website whenever a state of a child component is created.
- UserCredentialsDialog contains components for the login and register functionalities that are used in the homeScreen to popup whenever a user clicks login or register buttons.
- localStorage is a file that contains functions used in the app to save tokens, roles, and balances to the local storage of the application.
- .gitignore is the file that lists the files that shouldn't be pushed to the repository
- App.js is the main file for the frontend that contains the routes basically and it is ran in the index.js file to render the application.
- package.json file contains the required libraries and dependencies that are used in this application and will be installed automatically when someone does a pull request from github repo.

## For more info on the setup go to exchange-rate/README.md