# Front-end Project Structure and General Architecture

- This folder inlcudes an integrated React app frontend with the backend server.
- The website hosted can read and write data from the central server.
- Visual Studio Code was used for development and Google Chrome for the testing of the application.

The web front-end displays 2 unique pages: the home page and the profile page done by setting states depending on
the user token (logged in or guest) and on the personal infprmation token (displays relevant content and hides the rest). Routing is used for transition between screens.

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

## For more info on the setup go to exchange-rate/README.md