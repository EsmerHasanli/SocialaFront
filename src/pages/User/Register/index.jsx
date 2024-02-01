import React from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import RegisterForm from "../../../components/User/RegisterForm";
import "./index.scss";
import FormSlider from "../../../components/User/FormSlider";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Sociala | Register</title>
      </Helmet>
      <section className="register">
        <Grid container>
          <Grid item sm={12} lg={4} >
            <RegisterForm />
          </Grid>
          <Grid item lg={8} sm={12}>
            <FormSlider />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Register;
