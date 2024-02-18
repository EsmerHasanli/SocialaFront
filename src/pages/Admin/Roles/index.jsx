import { observer } from "mobx-react-lite";
import React from "react";
import RolesTable from "../../../components/Admin/RolesTable";
import Navigation from "../../../components/Admin/Navigation";
import { Helmet } from "react-helmet";
import "./index.scss";
import { Typography } from "@mui/material";

const Roles = () => {
  return (
    <>
      <Helmet>
        <title>Roles</title>
      </Helmet>
      <Navigation />
      <section id="work-space-roles">
        <Typography variant="h3">Set Roles</Typography>
        <RolesTable />
      </section>
    </>
  );
};

export default observer(Roles);
