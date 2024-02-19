import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import RequestsTable from "../../../components/Admin/Table";
import { Context } from "../../../main";
import { Helmet } from "react-helmet";
import "./index.scss";
import Navigation from "../../../components/Admin/Navigation";
import { Typography } from "@mui/material";

const VerifyRequests = () => {
  const [verifyRequests, setVerifyRequests] = useState([]);
  const [sortType, setSortType] = useState("time");
  const [skip, setSkip] = useState(0);
  const [isDesc, setIsDesc] = useState(false);

  const { store } = useContext(Context);

  async function getVerifyRequests() {
    const requests = await store.getVerifyRequests(sortType, isDesc, skip);
    console.log(requests);
    setVerifyRequests(requests);
  }
  useEffect(() => {
    getVerifyRequests();
  }, []);

  return (
    <>
      <Helmet>
        <title>Verify Requests</title>
      </Helmet>
      <Navigation />
      <div id="work-space-verify">
        <Typography variant="h3">Vefirfy Requests</Typography>
        <RequestsTable verifyRequests={verifyRequests} />
      </div>
    </>
  );
};

export default observer(VerifyRequests);
