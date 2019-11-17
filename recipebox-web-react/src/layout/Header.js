import React from "react";

function Header(props) {

    let buttons = <button type="button" className="btn btn-outline-secondary btn-sm">Sign Out</button>
    if (!props.isLoggedIn) {
        buttons = <div>
            <button type="button" className="btn btn-outline-secondary btn-sm">Sign In</button>
            &nbsp;
            <button type="button" className="btn btn-outline-secondary btn-sm">Sign Up</button>
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