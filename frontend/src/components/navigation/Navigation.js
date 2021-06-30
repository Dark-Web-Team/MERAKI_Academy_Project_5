
import React, {   useEffect, useState } from "react";
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
import Autosuggest from "react-autosuggest"
import theme from "./theme";

const business = [
  {name:`sports`}, {name:`entertainment`}
]

const getSuggestions = (value) => {
  console.log('value',value)
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : business.filter((elem) =>
    elem.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => {
  return suggestion
};

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState([])

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const onSuggestionsFetchRequested = ( {value} ) => {
    setSuggestion(getSuggestions(value))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([])
  };

  const onChange = ( value ) => {
    setValue(value)
  };


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
        <Autosuggest
        suggestions={suggestion}
        onSuggestionsFetchRequested={(e)=>{onSuggestionsFetchRequested(e)}}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{placeholder: 'Type a business name',
        value,
        onChange: (e)=>{
          onChange(e.target.value)}}}
          theme={theme}
      />
          <Button variant="outline-info" onClick={()=>{
            history.push(`/search/${search}`)
          }}>Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default Navigation;
