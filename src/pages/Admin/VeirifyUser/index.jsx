import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import RequestsTable from "../../../components/Admin/VerifyRequests";
import { Context } from "../../../main";
import { Helmet } from "react-helmet";
import "./index.scss";
import Navigation from "../../../components/Admin/Navigation";
import { MenuItem, OutlinedInput, Pagination, Select, Typography, }from "@mui/material";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const VerifyRequests = () => {
  const [verifyRequests, setVerifyRequests] = useState([]);
  const [firstSelectOpen, setFirstSelectOpen] = useState(false);
  const [secondSelectOpen, setSecondSelectOpen] = useState(false);
  const [firstSelectValue, setFirstSelectValue] = useState("New");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [secondSelect, setSecondSelect] = useState({
    display: "Ascending",
    value: false,
  });

  const { store } = useContext(Context);
  const { page } = useParams();

  const sortTypes = ["New", "Register Time", "Followers"];
  const ascSelect = [
    {
      display: "Ascending",
      value: false,
    },
    {
      display: "Descending",
      value: true,
    },
  ];
  async function getVerifyRequests() {
    console.log(secondSelect.value);
    const requests = await store.getVerifyRequests(
      firstSelectValue,
      secondSelect.value,
      (page - 1) * 1
    );
    if (requests) {
      setVerifyRequests(requests);
    }
  }
  async function getCount() {
    const data = await store.getVerifyRequestsCountAsync();
    setCount(Math.ceil(data));
  }
  useEffect(() => {
    if (page >= 1) {
      getVerifyRequests();
      getCount();
    }
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Verify Requests</title>
      </Helmet>
      <Navigation />
      <div id="work-space-verify">
        <Typography variant="h3">Verify Requests</Typography>
        <Select
          value={firstSelectValue}
          open={firstSelectOpen}
          onOpen={() => setFirstSelectOpen(true)}
          onClose={() => setFirstSelectOpen(false)}
          onChange={(e) => setFirstSelectValue(e.target.value)}
        >
          {sortTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={secondSelect.value}
          open={secondSelectOpen}
          onOpen={() => setSecondSelectOpen(true)}
          onClose={() => setSecondSelectOpen(false)}
          onChange={(e) =>
            setSecondSelect({ ...secondSelect, value: e.target.value })
          }
        >
          {ascSelect.map((order) => (
            <MenuItem key={order.display} value={order.value}>
              {order.display}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={getVerifyRequests}>GET</Button>
        <RequestsTable verifyRequests={verifyRequests} />
      </div>
      <Pagination
        count={count}
        page={Number(page)}
        onChange={(e, page) => navigate(`/verify-requests/${page}`)}
      ></Pagination>
    </>
  );
};

export default observer(VerifyRequests);
