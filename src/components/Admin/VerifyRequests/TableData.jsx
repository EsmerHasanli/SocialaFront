import React, { useContext } from "react";
import { TableCell, TableRow, Avatar, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";

const TableData = ({ data,verifyRequests, setVerifyRequests }) => {
  const dateString = data.registeredAt;

  const dateObject = new Date(dateString);

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const {store} = useContext(Context)

  async function confirmOrCancelRequest(id, status) {
    const res = await store.confirmOrCancelVerifyRequest(id, status);
    
    if (res.status == 204) {
      const filteredRequests = verifyRequests.filter(vr => vr.id != id);
      setVerifyRequests(filteredRequests)
    }
  }
  return (
    <TableRow
      key={data.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar src={data?.imageUrl} />
      </TableCell>
      <TableCell align="left">{data?.fullname}</TableCell>
      <TableCell align="left">{data?.userName}</TableCell>
      <TableCell align="right">
        {day}/{month}/{year} {hours}:{minutes}
      </TableCell>
      <TableCell align="left">{data?.followersCount}</TableCell>
      <TableCell align="left">
        <IconButton onClick={(e) => confirmOrCancelRequest(data.id, true)}>
          <CheckIcon />
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <IconButton onClick={(e) => confirmOrCancelRequest(data.id, false)}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default observer(TableData);