import React, { useState } from "react";
import { FaIcons, AiIcons } from "./../util/icons";
import { NavLink, Link } from "react-router-dom";
import "./NavMenu.css";
import Cookies from "universal-cookie";

const Sidebar = (props) => {
  const cookies = new Cookies();
  const usr = cookies.get("form");

  return (
    <div
      className={props.collapsed ? "sidebar active bg-dark" : "sidebar bg-dark"}
      toggleNavbar
    >
      {usr ? (
        <ul>
          <li>
            <NavLink
              className="rounded py-2 w-100 d-inline-block px-2"
              exact
              activeClassName="active"
              to="/Submit"
            >
              <FaIcons.FaUsers className="mr-2" />
              <span className="textmenu">Submit</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="rounded py-2 w-100 d-inline-block px-2"
              exact
              activeClassName="active"
              to="/Categories"
            >
              <FaIcons.FaLayerGroup className="mr-2" />
              <span className="textmenu">Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="rounded py-2 w-100 d-inline-block px-2"
              exact
              activeClassName="active"
              to="/Products"
            >
              <FaIcons.FaBoxes className="mr-2" />
              <span className="textmenu">Products</span>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink
              className="rounded py-2 w-100 d-inline-block px-2"
              exact
              activeClassName="active"
              to="/"
            >
              <AiIcons.AiOutlineLogin className="mr-2" />
              <span className="textmenu">Login</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
    // <header>
    //   <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3">
    //     <Container>
    //       <NavbarBrand tag={Link} className="text-light" to="/">
    //         Submit Service
    //       </NavbarBrand>
    //       <NavbarToggler onClick={toggleNavbar} className="mr-2" />
    //       <Collapse
    //         className="d-sm-inline-flex flex-sm-row-reverse"
    //         isOpen={!collapsed}
    //         navbar
    //       >
    //         <ul className="navbar-nav flex-grow">
    //           <NavItem>
    //             <NavLink tag={Link} className="text-light" to="/Submit">
    //               Submit
    //             </NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink tag={Link} className="text-light" to="/Categories">
    //               Category
    //             </NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink tag={Link} className="text-light" to="/Products">
    //               Product
    //             </NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink tag={Link} className="text-light" to="/User">
    //               User
    //             </NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink
    //               tag={Link}
    //               className="text-light"
    //               to="/"
    //               onClick={() => logout()}
    //             >
    //               Logout
    //             </NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <img className="profilePicture" src={usr.imageUrl} alt="Avatar" width="50px" height="50px"/>
    //           </NavItem>
    //         </ul>
    //       </Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
    // <ProSidebar
    //   collapsed={true}
    //   toggled={true}
    //   breakPoint="md"
    // >
    //   <SidebarContent>
    //     <Menu iconShape="circle">
    //       <p align="center">
    //         <img
    //           className="profilePicture"
    //           src={usr.imageUrl}
    //           alt="Avatar"
    //           width="50px"
    //           height="50px"
    //         />
    //         {usr.name}
    //       </p>
    //       <MenuItem>
    //         <Link to="/" />
    //       </MenuItem>
    //       <MenuItem>
    //         <Link to="/Submit" />
    //         Submit
    //       </MenuItem>
    //       <MenuItem>
    //         <Link to="/Categories" />
    //         Categories
    //       </MenuItem>
    //       <MenuItem>
    //         <Link to="/Products" />
    //         Products
    //       </MenuItem>
    //       <MenuItem>
    //         <Link
    //           tag={Link}
    //           className="text-light"
    //           to="/"
    //           onClick={() => logout()}
    //         />
    //         Logout
    //       </MenuItem>
    //       <MenuItem>
    //         <Link to="/User" />
    //         User
    //       </MenuItem>
    //     </Menu>
    //   </SidebarContent>
    //   <SidebarFooter style={{ textAlign: 'center' }}>
    //   <div
    //     className="sidebar-btn-wrapper"
    //     style={{
    //       padding: '20px 24px',
    //     }}
    //   >
    //     <a
    //       href="https://github.com/azouaoui-med/react-pro-sidebar"
    //       target="_blank"
    //       className="sidebar-btn"
    //       rel="noopener noreferrer"
    //     >
    //     </a>
    //   </div>
    // </SidebarFooter>
    // </ProSidebar>
  );
};

export default Sidebar;
