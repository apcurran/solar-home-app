import React from 'react';
import LoggedOutLinks from "./LoggedOutLinks";

import "./Header.css";

function Header({ headerHome }) {
    return (
        <header className={`header ${headerHome ? headerHome : null}`}>
            <nav className="nav">
                <LoggedOutLinks />
            </nav>
        </header>
    );
}

export default Header;
