import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Home from './pages/Home/Home';
import Planner from './pages/Planner/Planner';
import Recipes from './pages/Recipes/Recipes';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login/Login";

import auth from './auth';
import Shopping from "./pages/Shopping/Shopping";

function App() {
	auth.checkAuth();
	const isLoggedIn = auth.user.authenticated;

	let navigationElem = isLoggedIn ? <Navigation/> : null;

	return (
		<div className="app">
			<Router>
				<Header isLoggedIn={isLoggedIn}/>
				{navigationElem}
				<div className="main_content">
					<div className="container">
						<Switch>
							<Route path="/recipes" exact={true}><Recipes /></Route>
							<Route path="/planner" exact={true}><Planner /></Route>
							<Route path="/shopping" exact={true}><Shopping /></Route>

							<Route path="/login" exact={true}><Login /></Route>
							<Route path="/logout" exact={true}><Home logout={true} /></Route>

							<Route path="/"><Home /></Route>
						</Switch>
					</div>
				</div>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
