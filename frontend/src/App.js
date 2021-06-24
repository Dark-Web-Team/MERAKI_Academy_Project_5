import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from "./components/auth/signUp/SignUp"

const App = () => {
	return <div className="App">

		<Route exact path="/signUp" component={SignUp} />


	</div>;
};

export default App;
