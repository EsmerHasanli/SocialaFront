import * as React from "react";
import './index.scss';
import Navigation from "../../../components/Admin/Navigation";
import Chart from "../../../components/Admin/Chart";
import WeatherCard from "../../../components/Admin/WeatherCard";
import WelcomeCard from "../../../components/Admin/WelcomeCard";
import UsersCount from "../../../components/Admin/UsersCount";
import VerifiedUsersCount from "../../../components/Admin/VerifiedUsersCount";
import ModeratorsCount from "../../../components/Admin/ModeratorsCount";
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import AdminsCount from "../../../components/Admin/AdminsCount";


const Dashboard = () => {
  const { store } = React.useContext(Context)
  const [genderStatistic, setGenderStatistic] = React.useState({})
  const [ allUsersCount, setAllUsersCount ] = React.useState(0)
  const [ adminsCount, setAdminsCount ] = React.useState(0)
  const [ moderatorsCount, setModeratorsCount ] = React.useState(0)
  const [ verifiedUsersCount, setVerifiedUSersCount ] = React.useState(0)

  React.useEffect(()=>{
    async function fetchData() {
      const res = await store.getManage()
      setGenderStatistic(res.registeredUsersCountByGender)
      setAllUsersCount(res.allUsersCount)
      setAdminsCount(res.adminsCount)
      setModeratorsCount(res.moderatorsCount)
      setVerifiedUSersCount(res.verifiedUsersCount)
    }
    fetchData()
  },[])

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
          <AdminsCount adminsCount={adminsCount} />
          <ModeratorsCount moderatorsCount={moderatorsCount} />
          <UsersCount allUsersCount={allUsersCount} />
          <VerifiedUsersCount verifiedUsersCount={verifiedUsersCount} />
        </div>
        <div id="work-space-chart">
          <Typography variant="h3">Gender Distribution</Typography>
          <Chart genderStatistic={genderStatistic} />  
        </div>
      </div>
    </>
  );
};

export default observer(Dashboard);
