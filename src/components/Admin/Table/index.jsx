import React from "react";
import { Table } from "antd";
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullname",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fullname.indexOf(value) === 0,
    sorter: (a, b) => a.fullname.length - b.fullname.length,
    sortDirections: ["descend"],
  },
  {
    title: "Username",
    dataIndex: "username",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.username.indexOf(value) === 0,
    sorter: (a, b) => a.username.length - b.username.length,
    sortDirections: ["descend"],
  },
  {
    title: "Followers",
    dataIndex: "followersCount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.followersCount - b.followersCount,
  },
  {
    title: "Link",
    dataIndex: "link",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.link.indexOf(value) === 0,
  },
  {
    title: "Sumit",
    render: (text, record) => <IconButton><CheckIcon style={{color:'rgb(79,195,145)'}}/></IconButton>,
  },
  {
    title: "Cancel",
    render: (text, record) => <IconButton><CloseIcon style={{color:'rgb(211,47,47)'}}/></IconButton>,
  }
];
const data = [
  {
    key: "1",
    fullname: "John Brown",
    username: "John",
    followersCount: 32,
    link: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    fullname: "Jim Green",
    username: 'John',
    followersCount: 42,
    link: "London No. 1 Lake Park",
  },
  {
    key: "3",
    fullname: "Joe Black",
    username: 'John',
    followersCount: 32,
    link: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    fullname: "Jim Red",
    username: 'John',
    followersCount: 32,
    link: "London No. 2 Lake Park",
  },
  {
    key: "5",
    fullname: "John Brown",
    username: "John",
    followersCount: 32,
    link: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    fullname: "Jim Green",
    username: 'John',
    followersCount: 42,
    link: "London No. 1 Lake Park",
  },
  {
    key: "7",
    fullname: "Joe Black",
    username: 'Lola',
    followersCount: 32,
    link: "Sydney No. 1 Lake Park",
  },
  {
    key: "8",
    fullname: "Jim Red",
    username: 'John',
    followersCount: 32,
    link: "London No. 2 Lake Park",
  },
  {
    key: "9",
    fullname: "John Brown",
    username: "John",
    followersCount: 32,
    link: "New York No. 1 Lake Park",
  },
  {
    key: "10",
    fullname: "Jim Green",
    username: 'John',
    followersCount: 42,
    link: "London No. 1 Lake Park",
  },
  {
    key: "11",
    fullname: "Joe Black",
    username: 'John',
    followersCount: 32,
    link: "Sydney No. 1 Lake Park",
  },
  {
    key: "12",
    fullname: "Jim Red",
    username: 'John',
    followersCount: 32,
    link: "London No. 2 Lake Park",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const RequestsTable = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default RequestsTable;
