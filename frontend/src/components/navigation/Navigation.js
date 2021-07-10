
import React, { useEffect, useState } from "react";
import {  useHistory,Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {FaBars} from "react-icons/fa"
import {FcSearch} from "react-icons/fc"
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
      <nav className="navbar-container">
     
      
      <div className = "cxcxc">

        <div className="web-name-app">
        <p id="booking" > Booking<p id="online">Dark-Web </p></p>
        </div>

      <div className = "search-nav-bar">
        <div><Autosuggest
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
      /></div>
      <div>
      &nbsp;&nbsp;&nbsp;
      {/* <Button  style={{textAlign: 'center' , paddingTop: '-20'}} className = 'searchButton' variant="dark" onClick={()=>{
            history.push(`/search/${search}`)
          }} >Search</Button> */}
          <FcSearch size={30} onClick={()=>{
            history.push(`/search/${search}`)
          }}/>
      </div>
        </div>
        
      <div className = "ul-navbar">
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <FaBars />
      </label>
      
      <ul >
        <li><Link to="/"  style={{textDecoration:"none"}}>Home</Link></li>
        {!state.token ?<li><Link to="/login" style={{textDecoration:"none"}}>Login</Link></li> :""}
        {state.token ?<li><Link to="/profile" style={{textDecoration:"none"}}>profile</Link></li> :""}
        {state.token ?<li><Link onClick={() => {
                localStorage.removeItem('token');
                dispatch(setToken(""));
                history.push("/")
              }}
                style={{textDecoration:"none"}}>Sign Out</Link></li> :""}   
      </ul>
      </div>
      
      
      </div>
      
    </nav>
    </div>
  );
};

export default Navigation;
/*
<li><div className = "search-nav-bar">
        <div><Autosuggest
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
      /></div>
      <div>
      <Button variant="outline-info" onClick={()=>{
            history.push(`/search/${search}`)
          }}>Search</Button>
      </div>
        </div>
          </li>




*/