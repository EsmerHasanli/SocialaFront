import * as React from "react";
import Searchusers from "./Searchusers";
import SearchedUserCard from "./SearchedUserCard";

const RolesTable = () => {
 
  const [searchedUsers, setSearchedUsers] = React.useState([])

  return (
    <>
      <Searchusers searchedUsers={searchedUsers} setSearchedUsers={setSearchedUsers} />
      <div className="cards-wrapper">
        {
          searchedUsers && searchedUsers.map(user => 
            <SearchedUserCard user={user} />
          ) 
        }
      </div>
    </>
  );
};

export default RolesTable;
