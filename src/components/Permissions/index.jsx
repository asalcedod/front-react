import React, { useState, useEffect, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import NavMenu from './../NavMenu'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { baseUrl } from '../constants/url'
import axios from 'axios'

const Permissions = (props) => {
  
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
