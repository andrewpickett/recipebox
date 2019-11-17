import React from "react";

function Footer() {
    return (
        <footer className="app-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        &copy;{new Date().getFullYear()} RecipeBox. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;