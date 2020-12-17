import React from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import Products from './components/Products'
import Login from './components/Login'
import Submit from './components/Submit'
import User from './components/User'
import Permissions from './components/Permissions'
import './custom.css'


const App = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Submit" component={Submit} />
      <Route path="/Products" component={Products} />
      <Route path="/User" component={User} />
      <Route path="/Permissions" component={Permissions} />
    </div>
  )
}

export default App