import React from "react";
import './Navigation.css';
import {NavLink} from 'react-router-dom';

function Navigation() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light rb-navigation">
			<div className="container">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item col-sm-6">
							<NavLink className="nav-link" to="/recipes">Recipes</NavLink>
						</li>
						<li className="nav-item col-sm-6">
							<NavLink className="nav-link" to="/shopping">Shopping List</NavLink>
						</li>
						<li className="nav-item col-sm-6">
							<NavLink className="nav-link" to="/planner">Planner</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
