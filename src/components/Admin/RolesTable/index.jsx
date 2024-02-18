import * as React from "react";
import Searchusers from "./Searchusers";
import { styled, useTheme } from "@mui/material/styles";
import {Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from '@mui/icons-material/Close';

const RolesTable = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const theme = useTheme();
  const [roles, setRoles] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const roleList = ['Member', 'Verified user', 'Moderator', 'Admin'];

  function getStyles(name, roles, theme) {
    return {
      fontWeight:
        roles.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [searchedUsers, setSearchedUsers] = React.useState([])

  return (
    <>
      <Searchusers searchedUsers={searchedUsers} setSearchedUsers={setSearchedUsers} />
      <div className="cards-wrapper">
        {
          searchedUsers && searchedUsers.map(user => 
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={user.imageUrl}/>
                }
                title={`${user.name} ${user.surname}`}
                subheader={`@${user.userName}`}
              />
              <CardContent>
                {
                  user.roles.map(role => 
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <p style={{color:'#252F3F'}}>{role}</p>
                      <IconButton>
                        <CloseIcon style={{fontSize:'14px'}}/>
                      </IconButton>
                    </div>
                  )
                }
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Roles:</Typography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Roles</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={roles}
                      onChange={handleChange}
                      input={<OutlinedInput label="Roles" />}
                      MenuProps={MenuProps}
                    >
                      {roleList.map((role) => (
                        <MenuItem
                          key={role}
                          value={role}
                          style={getStyles(role, roles, theme)}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ul style={{margin:'10px'}}>
                    {roles.map((role, index) => (
                    <li key={index} style={{fontSize:'14px', fontWeight:'400', margin:'5px 0', display:'flex', alignItems:'center', gap:'10px'}}>
                      <span>{role}</span>
                      <IconButton>
                        <CloseIcon style={{fontSize:'14px'}} />
                      </IconButton>
                    </li>
                  ))}
                  </ul>
                  <Button>cancel</Button>
                  <Button>submit</Button>
                </CardContent>
              </Collapse>
            </Card>
          ) 
        }
      </div>
    </>
  );
};

export default RolesTable;
