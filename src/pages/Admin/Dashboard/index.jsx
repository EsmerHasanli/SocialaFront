import * as React from "react";
import './index.scss';
import Navigation from "../../../components/Admin/Navigation";
import Chart from "../../../components/Admin/Chart";
import WeatherCard from "../../../components/Admin/WeatherCard";
import WelcomeCard from "../../../components/Admin/WelcomeCard";
import UsersCount from "../../../components/Admin/UsersCount";
import TasksCount from "../../../components/Admin/TasksCount";
import ModeratorsCount from "../../../components/Admin/ModeratorsCount";



const Dashboard = () => {
  return (
    <div id='admin-dashboard'>
      <Navigation />
      <div id='hero-wrapper'>
        <WeatherCard/>
        <div className="image-wrapper">
          <img src="https://www.freedomforum.org/content/uploads/2022/08/1920x1080_speech_social_media.jpg" alt="" />
        </div>
        <WelcomeCard/>
      </div>
      <div className="cards-wrapper">
        <UsersCount/>
        <ModeratorsCount/>
        <TasksCount/>
      </div>
        <Chart/>
    </div>
  );
};

export default Dashboard;
