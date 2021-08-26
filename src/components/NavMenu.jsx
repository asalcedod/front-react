import React, { useState } from "react";
import { FaIcons, AiIcons, BiIcons, CgIcons } from "./../util/icons";
import Cookies from "universal-cookie";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import noPicture from "./../images/no_user.png"

const NavMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cookies = new Cookies();
  const usr = cookies.get("form");

  const logout = () => {
    localStorage.clear()
    cookies.remove("form", { path: "/" });
    props.accessLogout()
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={props.toggleNavbar}>
          <Button ><CgIcons.CgMenu /></Button>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img
                  className="profilePicture mr-2"
                  src={usr ? usr.imageUrl : noPicture}
                  alt="avatar-ang"
                  width="30px"
                  height="30px"
                />
                {usr ? usr.name : "Sign in session"}
              </DropdownToggle>
              <DropdownMenu hidden={usr ? false : true} right>
                {/* <DropdownItem divider /> */}
                <DropdownItem onClick={logout}>
                  <FaIcons.FaSignOutAlt className="mr-2" />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;
