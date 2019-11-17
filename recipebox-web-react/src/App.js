import React from 'react';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Navigation from './layout/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const isLoggedIn = true;

    let navigationElem = isLoggedIn ? <Navigation /> : null;

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} />
            {navigationElem}
            <div className="main_content">
                <div className="container">
                    I love recipes, yes I do!
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
