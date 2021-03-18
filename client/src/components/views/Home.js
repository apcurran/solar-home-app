import React from 'react';

import "./Home.css";
import Header from "../layout/header/Header";

function Home() {
    return (
        <>
            <Header headerHome = "header-home" />
            <div className="home">
                <section className="home__hero">
                    <section className="home__hero__title-sect">
                        <h1 className="home__hero__title">Solar</h1>
                        <h1 className="home__hero__title--subheading">For Your Home</h1>
                    </section>
                </section>
            </div>
        </>
    );
}

export default Home;
