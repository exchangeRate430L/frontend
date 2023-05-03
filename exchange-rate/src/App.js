import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./components/homeScreen";
import ProfileScreen from "./components/profileScreen";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element ={<ProfileScreen/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
