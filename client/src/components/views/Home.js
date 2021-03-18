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
                <main className="home__main">
                    <section className="home__main__sect">
                        <div className="home__main__sect__inner-sect--content">
                            <h2 className="home__main__sect__inner-sect__title">Choose Solar Tiles or Panels</h2>
                            <p className="home__main__sect__inner-sect__desc">
                                Phasellus sit amet varius neque. Fusce mattis erat at est mattis, sed gravida lorem maximus. Phasellus eget pharetra nibh. Aliquam ex lectus, commodo vel tortor in, interdum molestie neque. Curabitur laoreet, sapien nec porta faucibus, risus diam finibus dolor, quis convallis velit est eget libero.
                            </p>
                        </div>
                        <div className="home__main__sect__inner-sect--visual">
                            <figure className="home__main__sect__inner-sect--visual__fig">
                                <img  className="home__main__sect__inner-sect--visual__fig__img" src="https://res.cloudinary.com/dev-project/image/upload/f_auto,q_auto/v1616083916/aperture-solar/house-solar-panels_szr0wk.jpg" alt="Two-story house with solar panels on the roof."/>
                            </figure>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Home;
