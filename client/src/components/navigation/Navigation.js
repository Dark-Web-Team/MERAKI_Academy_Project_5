import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import {AiOutlineHome} from 'react-icons/ai'
import {FcHome} from "react-icons/fc"
import {CgProfile} from "react-icons/cg"
import {RiLoginBoxFill,RiLoginBoxLine} from "react-icons/ri"
import {IoLogOutOutline} from "react-icons/io5"
import {BsChatDots} from "react-icons/bs"


import { setToken } from "../../reducers/login";
import axios from "axios";
import "./navigation.css";
import Autosuggest from "react-autosuggest";
import theme from "./theme";

const Navigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [checked, setChecked] = useState(false)

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : businesses.filter(
          (elem) =>
            elem.displayName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => {
    return suggestion.displayName;
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.displayName}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  const onChange = (value) => {
    setSearch(value);
    setValue(value);
  };

  useEffect(async () => {
    try {
      const searchResult = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}business/search/${search}`
      );
      setBusinesses(searchResult.data);
    } catch (error) {}
  }, [search]);

  return (
    <div className="nav-container">
      <nav className="navbar-container">
        <div className="navbar-content">
          <div className="web-name-app" onClick={()=>{history.push("/")}} >
            <p id="booking">
              {" "}
              -Booking<p id="online">Dark-Web </p>
            </p>
          </div>

          <div className="search-nav-bar">
            <div>
              <Autosuggest 
                suggestions={suggestion}
                onSuggestionsFetchRequested={(e) => {
                  onSuggestionsFetchRequested(e);
                }}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: "Type a business name",
                  value,
                  onChange: (e) => {
                    onChange(e.target.value);
                  },
                }}
                onSuggestionSelected={(e) => {
                  onChange(e.target.innerText);
                }}
                theme={theme}
              />
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;
              <FcSearch  title="Search" className ="navbar-icon-FA"
                size={30}
                onClick={() => {
                  history.push(`/search/${search}`);
                }}
              />
            </div>
          </div>

          <div className="ul-navbar">
            <input type="checkbox" id="check" checked={checked} onChange={()=>{setChecked(!checked)}} />
            <label for="check" class="checkbtn" onChange={()=>{setChecked(!checked)}} > 
              <FaBars />
            </label>

            <ul>
              <li>
                <AiOutlineHome  title="Home"  className="navbar_icon-FA" size={35} color="white" onClick={()=>{
                  setChecked(false)
                  history.push("/")}} />
                
              </li>
              {!state.token ? (
                <li>
                  <RiLoginBoxLine  title="Login" className="navbar_icon-FA"  size={35} color="white" onClick={()=>{
                    setChecked(false)
                    history.push("/login")}}  />
                </li>
              ) : (
                ""
              )}
              {state.token ? (
                <li>
                 <CgProfile title="Profile"  className="navbar_icon-FA" size={35} color="white" onClick={()=>{
                   setChecked(false)
                   history.push("/profile")}} />
                </li>
              ) : (
                ""
              )}
              {state.token ? (
                <li>
                  <BsChatDots title="Chat"  className="navbar_icon-FA" size={35} color="white" onClick={()=>{
                    setChecked(false)
                    history.push("/chat")}}  />
                </li>
              ) : (
                ""
              )}
              {state.token ? (
                <li>
                  <IoLogOutOutline title="Signout"   className="navbar_icon-FA" size={35} color="white" 
                    onClick={() => {
                      setChecked(false)
                      localStorage.removeItem("token");
                      dispatch(setToken(""));
                      history.push("/");
                    }}
                    style={{ textDecoration: "none" }}
                  />
                    
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
