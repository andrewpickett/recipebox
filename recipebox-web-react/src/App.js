import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import Footer from './layout/Footer';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Home from './pages/Home/Home';
import Planner from './pages/Planner/Planner';
import Recipes from './pages/Recipes/Recipes';
import Shopping from "./pages/Shopping/Shopping";
import Login from "./pages/Login/Login";
import Recipe from "./pages/Recipes/Recipe";

// Utilities
import auth from './auth';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "./config";

function App() {
	auth.checkAuth();
	const isLoggedIn = auth.user.authenticated;
	const userName = isLoggedIn ? sessionStorage.getItem(config.USER_STORAGE_KEY) : null;

	return (
		<div className="app">
			<Router>
				<Header isLoggedIn={isLoggedIn} userName={userName}/>
				{isLoggedIn ? <Navigation /> : null}
				<div className="main_content">
					<div className="container">
						<Switch>
							<Route path="/recipes" exact={true} component={Recipes} />
							<Route path="/recipes/:recipe_id" exact={true} component={Recipe} />
							<Route path="/planner" exact={true} component={Planner} />
							<Route path="/shopping" exact={true} component={Shopping} />

							<Route path="/login" exact={true} component={Login} />
							<Route path="/logout" exact={true}><Home logout={true} /></Route>

							<Route path="/" component={Home} />
						</Switch>
					</div>
				</div>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
