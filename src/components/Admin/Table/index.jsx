import React, { useState } from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";


const RequestsTable = () => {
  const [datas, setDatas] = useState([])
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
            {datas.map((data, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar/>
                </TableCell>
                <TableCell align="left">{data?.fullName}</TableCell>
                <TableCell align="left">{data?.userName}</TableCell>
                <TableCell align="right">{data?.registeredAt}</TableCell>
                <TableCell align="left">{data?.followersCount}</TableCell>
                <TableCell align="left">
                  <IconButton>
                    <CheckIcon/>
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton>
                    <CloseIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequestsTable;
