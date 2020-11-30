import React from 'react'
import { Route } from 'react-router'
import Customers from './components/Customers'
import Login from './components/Login'
import Submit from './components/Submit'
import Database from './components/DBView'
import { Container } from 'reactstrap'
import User from './components/User'
import Permissions from './components/Permissions'
import './custom.css'


const App = () => {
  return (
    <Container>
      <Route exact path="/" component={Login} />
      <Route exact path="/Submit" component={Submit} />
      <Route path="/Customers" component={Customers} />
      <Route path="/DBView" component={Database} />
      <Route exact path="/User" component={User} />
      <Route exact path="/Permissions" component={Permissions} />
    </Container>
  )
}

export default App