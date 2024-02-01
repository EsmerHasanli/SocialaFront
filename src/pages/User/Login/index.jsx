import React from 'react'
import {Helmet} from "react-helmet";
import FormSlider from '../../../components/User/FormSlider';
import { Grid } from '@mui/material';
import LoginForm from '../../../components/User/LoginForm';

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
          <Grid item sm={6} lg={8} md={6} xs={12}>
            <FormSlider />
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default Login