import React from "react";
import "./index.scss";
import { Helmet } from "react-helmet";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Opps, something-lost</title>
      </Helmet>

      <div className="notFound">
        <img
          src="https://demo.foxthemes.net/htdocs_error/something-lost.png"
          alt="404"
        />
        <h1>Oops, looks like the page is lost.</h1>
        <h2>This is not a fault, just an accident that was not intentional.</h2>
      </div>
    </>
  );
};

export default NotFound;
