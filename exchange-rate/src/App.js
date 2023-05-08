import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./components/homeScreen";
import ProfileScreen from "./components/profileScreen";
import NewsScreen from "./components/newsScreen";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element ={<ProfileScreen/>}/>
          <Route path="/news" element={<NewsScreen/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
