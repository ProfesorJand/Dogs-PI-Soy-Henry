import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx"
import NavBar from "./components/NavBar"


function App() {


  return (
    <>
    
    <Route exact path="/" component={LandingPage} />
    <NavBar/>
    <Route exact path="/home" component={Home} />
    </>
  );
}

export default App;
