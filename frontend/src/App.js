import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from "./components/auth/signUp/SignUp";
import Login from './components/auth/login';

const App = () => {
	return <div className="App">

		<Route exact path="/signUp" component={SignUp} />
		<Route exact path="/login" component={Login} />


	</div>;
};

export default App;
