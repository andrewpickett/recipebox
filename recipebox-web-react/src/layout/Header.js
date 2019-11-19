import React from "react";
import './Header.css';

function Header(props) {

    let buttons = <div>
		 <span>Hello, user!</span> <a className="btn btn-outline-secondary btn-sm" href="logout" role="button">Sign Out</a>
	 </div>
    if (!props.isLoggedIn) {
        buttons = <div>
            <a className="btn btn-outline-secondary btn-sm" href="/login" role="button">Sign In</a>
            &nbsp;
            <a className="btn btn-outline-secondary btn-sm" href="/logout" role="button">Sign Up</a>
        </div>
    }
    return (
        <header className="app-header">
            <div className="container">
                <div className="row">
                    <div className="col-sm text-left">
                        <div className="app-logo">
                            &nbsp; {props.isLoggedIn}
                        </div>
                    </div>
                    <div className="col-sm my-auto text-right">
                        {buttons}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
