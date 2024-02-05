import React from "react";
import "./index.scss";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Opps, something-lost</title>
      </Helmet>

      <section className="notFound">
        <div>
          <img
            src="https://demo.foxthemes.net/htdocs_error/something-lost.png"
            alt="404"
          />
          <h1>Oops, looks like the page is lost.</h1>
          <h2>
            This is not a fault, just an accident that was not intentional.
          </h2>
          <Link to='/'>Home</Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
