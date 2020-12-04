import React from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import Customers from './components/Customers'
import Login from './components/Login'
import Submit from './components/Submit'
import User from './components/User'
import Permissions from './components/Permissions'
import './custom.css'


const App = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/Submit" component={Submit} />
      <Route path="/Customers" component={Customers} />
      <Route exact path="/User" component={User} />
      <Route exact path="/Permissions" component={Permissions} />
    </div>
  )
}

export default App