import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage.jsx"
import NavBar from "./components/NavBar";
import CreateDog from "./components/CreateDog.jsx";


function App() {


  return (
    <>
    
    <Route exact path="/" component={LandingPage} />
    <NavBar/>
    <Route exact path="/home" component={Home} />
    <Route exact path="/createdog" component={CreateDog} />
    </>
  );
}

export default App;
