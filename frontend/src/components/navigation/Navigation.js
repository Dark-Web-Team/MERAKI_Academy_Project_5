import React from 'react';
import { Link ,useHistory} from 'react-router-dom';

import {Navbar,Button,Nav,Form,FormControl,NavDropdown} from "react-bootstrap"
import "./navigation.css";

const Navigation = () => {
	const history = useHistory();

	return <div className="nav-container">
		<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={()=>{
          history.push("/");

	  }} >  Home</Nav.Link>
      <Nav.Link onClick={()=>{
          history.push("/login");

	  }} >Login</Nav.Link>
      <Nav.Link onClick={()=>{
          history.push("/signUp");

	  }}>sign Up</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  
  
	</div>
};

export default Navigation;
