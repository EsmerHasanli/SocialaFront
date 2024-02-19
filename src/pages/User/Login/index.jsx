import React from "react";
import { Helmet } from "react-helmet";
import FormSlider from "../../../components/User/FormSlider";
import { Grid } from "@mui/material";
import LoginForm from "../../../components/User/LoginForm/index";
import { observer } from "mobx-react-lite";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Sociala | Login</title>
      </Helmet>
      <section className="register">
        <Grid container>
          <Grid item sm={6} lg={4} md={6} xs={12}>
            <LoginForm />
          </Grid>
          {/* <Grid item sm={6} lg={8} md={6} xs={12}>
            <FormSlider />
          </Grid> */}
          <Grid
            // xs={false}
            item
            sm={6}
            lg={8}
            md={6}
            xs={12}
            component="video"
            autoPlay
            loop
            muted
            playsInline
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
          >
            <source
              src="https://cdn.dribbble.com/userupload/7936453/file/original-80071a533bd3c78d18f93bf70c273d1a.mp4"
              type="video/mp4"
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default observer(Login);
