import React from "react";
import { Helmet } from "react-helmet";
import { Divider, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";

import './index.scss'
import ResetPasswordForm from "../../../components/User/ResetPasswordForm";
import NotFound from "../../NotFound";

const RessetPassword = () => {
  const queryParams = new URLSearchParams(window.location.search);
  if (!queryParams.get("email") || !queryParams.get("token")) return <NotFound text={"Login"}/>

    return (
        <>
          <Helmet>
            <title>Sociala | Resest Password</title>
          </Helmet>
          <section id="set-new-password">
            <Grid container>
              <Grid item sm={6} lg={4} md={6} xs={12}>
                <nav>
                    <img src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png" alt="" />
                </nav>
                <Divider/>
                <ResetPasswordForm  queryParams={queryParams} />
              </Grid>
              <Grid
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
                  height: "100%",
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
}

export default observer(RessetPassword);