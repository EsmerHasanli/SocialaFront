import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import TableData from "./TableData";
import { observer } from "mobx-react-lite";


const RequestsTable = ({ verifyRequests,setVerifyRequests }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align="left">Full name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Registered time</TableCell>
              <TableCell align="left">Followers count</TableCell>
              <TableCell align="left">Accept</TableCell>
              <TableCell align="left">Deny</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {verifyRequests.map((data) => (
              <TableData data={data} verifyRequests={verifyRequests} setVerifyRequests={setVerifyRequests} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default observer(RequestsTable);