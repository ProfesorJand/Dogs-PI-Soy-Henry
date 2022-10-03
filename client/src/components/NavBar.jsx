import React from 'react';
import Logo from '../imagenes/logo.png';

import SearchBar from './SearchBar.jsx';
import './css/NavBar.css';



export default function NavBar() {

  return (

    <ul>
        <li><a href="/"><img id="LogoDog" src={Logo} width="30" height="30" className="logo" alt="Logo de Dog" /></a></li>
        <li ><a className={window.location.pathname === "/home" ? "active" : ""} href="/home">Home</a></li>
        <li><a className={window.location.pathname === "/createdog" ? "active" : ""} href="/createdog">Create Dog</a></li>
        <li className="busqueda"><SearchBar /></li>
    </ul>
  );
};
