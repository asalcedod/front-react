import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import Products from "./components/Products";
import Login from "./components/Login";
import Submit from "./components/Submit";
import Category from "./components/Category";
import User from "./components/User";
import Permissions from "./components/Permissions";
import "./App.scss";
import NavMenu from "./components/NavMenu";
import Sidebar from "./components/Sidebar";

const App = () => {
  const cookies = new Cookies();
  const [collapsed, setCollapsed] = useState(true);
  const [isLogin, setLogin] = useState(cookies.get("form") ? true : false);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const accessLogin = () => {
    setLogin(true);
  };
  const accessLogout = () => {
    setLogin(false);
    window.location.reload()
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar collapsed={collapsed} />
        <div className="content w-100">
          <NavMenu toggleNavbar={toggleNavbar} login={isLogin} accessLogout={accessLogout}/>
          <Route exact path="/" component={Login} />
          <Route path="/Submit" component={Submit} />
          <Route path="/Categories" component={Category} />
          <Route path="/Products" component={Products} />
          <Route path="/User" component={User} />
          <Route path="/Permissions" component={Permissions} />
        </div>
      </div>
    </Router>
    // <Layout>
    //   <Route exact path="/" component={Login} />
    //   <Route path="/Submit" component={Submit} />
    //   <Route path="/Categories" component={Category} />
    //   <Route path="/Products" component={Products} />
    //   <Route path="/User" component={User} />
    //   <Route path="/Permissions" component={Permissions} />
    // </Layout>
  );
};

export default App;
