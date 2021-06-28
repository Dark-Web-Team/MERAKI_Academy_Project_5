import React, {  useEffect } from "react";
import {  useHistory  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../reducers/login";
import {
  Navbar,
  Button,
  Nav,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import "./navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
   
  });
  return (
    <div className="nav-container">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              history.push("/");
            }}
          >
            {" "}
            Home
          </Nav.Link>
          {!state.token ? (
            <Nav.Link
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Nav.Link>
          ) : (
            ""
          )}
          {state.token ? (
            <Nav.Link
              onClick={() => {
                history.push("/profile")
              }}
            >
              My Profile
            </Nav.Link>
          ) : (
            ""
          )}
          {state.token ? (
            <Nav.Link
              onClick={() => {
                localStorage.clear();
                dispatch(setToken(""));
                history.push("/")
              }}
            >
              Sign Out
            </Nav.Link>
          ) : (
            ""
          )}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Navigation;
