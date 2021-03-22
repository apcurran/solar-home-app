import React from 'react';
import LoggedOutLinks from "./LoggedOutLinks";

import "./Header.css";

function Header({ headerHome, headerDesign }) {
    return (
        <header className={`header ${headerHome ? headerHome : headerDesign}`}>
            <nav className="nav">
                <LoggedOutLinks />
            </nav>
        </header>
    );
}

export default Header;
