import * as React from "react";
import './index.scss';
import Navigation from "../../../components/Admin/Navigation";
import Chart from "../../../components/Admin/Chart";
import WeatherCard from "../../../components/Admin/WeatherCard";
import WelcomeCard from "../../../components/Admin/WelcomeCard";
import UsersCount from "../../../components/Admin/UsersCount";
import TasksCount from "../../../components/Admin/TasksCount";
import ModeratorsCount from "../../../components/Admin/ModeratorsCount";
import RequestsTable from "../../../components/Admin/Table";
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";
import RolesTable from "../../../components/Admin/RolesTable";



const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div id='admin-dashboard'>
        <Navigation />
        <div id='hero-wrapper'>
          <WeatherCard/>
          <div className="image-wrapper">
            <img src="https://images.pexels.com/photos/3205538/pexels-photo-3205538.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
          </div>
          <WelcomeCard/>
        </div>
        <div className="cards-wrapper">
          <UsersCount/>
          <ModeratorsCount/>
          <TasksCount/>
        </div>
        <div id="work-space-chart">
          <Typography variant="h3">Gender Distribution</Typography>
          <Chart/>  
        </div>
        <div id="work-space-verify">
          <Typography variant="h3">Vefirfy Requests</Typography>
          <RequestsTable/>
        </div>
        <div id="work-space-roles">
          <Typography variant="h3">Set Roles</Typography>
          <RolesTable/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
