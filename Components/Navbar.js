import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function Navbar() {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/"
          exact
          className="link"
          activeClassName="active-link"
        >
          Main
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/movies"
          exact
          className="link"
          activeClassName="active-link"
        >
          Movies
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
