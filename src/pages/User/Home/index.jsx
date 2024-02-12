import { observer } from "mobx-react-lite";
import * as React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";

import Grid from "@mui/material/Grid";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import Stories from "../../../components/User/Stories";

const UserHomePage = () => {
  return (
    <>
      <Helmet>
        <title>Socialite</title>
      </Helmet>
      <section id="socilite-home-page">
        <Grid container spacing={2}>
          <Grid item lg={2}>
            <SideBar />
          </Grid>
          <Grid item lg={10} xs={12}>
            <Stories />
          </Grid>
        </Grid>
        <FooterMobile />
      </section>
    </>
  );
};

export default observer(UserHomePage);
