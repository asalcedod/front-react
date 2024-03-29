import React, { useState, useEffect, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import NavMenu from './../NavMenu'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import env from "react-dotenv";
import axios from 'axios'

const Permissions = (props) => {
  let baseUrl = process.env.REACT_APP_API_LOCAL
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = process.env.REACT_APP_API_DEV
      break;
    case "production":
      baseUrl = process.env.REACT_APP_API_PRODUCTION
      break;

    default:
      break;
  }
  return (
    <div class="Container">   
    <NavMenu /> 
    <div class="row">
    <div class="col-sm-4">
    <label for="sel1">Rol</label>
      <select
        class=""
        defaultValue="DEFAULT"
        name="rol"
        // onChange={handleChange}
        // value={user ? user.customerID : ''}
        id="rolID"
      >
        {/* {customer["customerID"] ? customer["customerID"] : null} */}
      </select>
    </div>
    </div>
    </div>    
  );
}

export default Permissions;
