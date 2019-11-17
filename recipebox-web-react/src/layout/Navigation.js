import React from "react";
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light rb-navigation">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item col-sm-6 active">
                            <a className="nav-link" href="#">Recipes</a>
                        </li>
                        <li className="nav-item col-sm-6">
                            <a className="nav-link" href="#">Shopping List</a>
                        </li>
                        <li className="nav-item col-sm-6">
                            <a className="nav-link" href="#">Meal Planner</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
