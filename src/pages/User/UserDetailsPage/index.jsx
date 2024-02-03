import React, { useContext } from "react";
import { Context } from "../../../main";
import { Helmet } from "react-helmet";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import SideBar from "../../../components/User/SideBar";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
const UserDetailsPage = () => {
  const { store } = useContext(Context);


  return (
    <>
      <Helmet>
        <title>Socialite</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar/>
        </Grid>
        <Grid item xs={10}>
          <Item>xs=9</Item>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetailsPage;
