
import React, {   useEffect, useState } from "react";
import {  useHistory  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../reducers/login";
import axios from "axios";
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



const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState([])
  const [businesses, setBusinesses] = useState([])

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const business = [
    {name:`sports`}, {name:`entertainment`}
  ]
  
  const getSuggestions = (value) => {
    console.log("value1",value)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : businesses.filter((elem) =>
      elem.displayName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  const getSuggestionValue = suggestion => {
    console.log('suggestion1',suggestion)
    return suggestion.displayName;
  };
  
  const renderSuggestion = suggestion => (
      <div>
      {suggestion.displayName}
    </div>
    );

  const onSuggestionsFetchRequested = ( {value} ) => {
    console.log('value2',value)
    setSuggestion(getSuggestions(value))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([])
  };

  const onChange = ( value ) => {
    console.log('value3',value)

    setSearch(value)
    setValue(value)
  };

  useEffect( async () => {
    try{
    const searchResult = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}business/search/${search}`)
        setBusinesses(searchResult.data)
        
       } catch (error) {
       }
    
  }, [search])


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
        onSuggestionSelected={(e)=>{
          onChange(e.target.innerText)}}
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
