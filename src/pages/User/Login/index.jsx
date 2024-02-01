import React from 'react'
import {Helmet} from "react-helmet";
import FormSlider from '../../../components/User/FormSlider';
import { Grid } from '@mui/material';

const Login = () => {
  return (
    <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <section className="register">
        <Grid container>
          <Grid item xs={12} sm={4}>
            {/* <LoginForm /> */}
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormSlider />
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default Login