import React from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import RegisterForm from "../../../components/User/RegisterForm";
import "./index.scss";
import FormSlider from "../../../components/User/FormSlider";
import { observer } from "mobx-react-lite";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Sociala | Register</title>
      </Helmet>
      <section className="register">
        <Grid container>
          <Grid item sm={6} lg={4} md={6} xs={12}>
            <RegisterForm />
          </Grid>
          <Grid item sm={6} lg={8} md={6} xs={12}>
            <FormSlider />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default observer(Register);
