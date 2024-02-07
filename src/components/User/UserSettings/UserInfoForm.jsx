import React from "react";
import Button from '@mui/material/Button'

const UserInfoForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input id="surname" name="surname" type="text" />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="None">None</option>
        </select>
      </div>
      <div>
        <label htmlFor="relationship">Relationship</label>
        <select name="relationship" id="relationship">
            <option value="None">None</option>
            <option value="Single">Single</option>
            <option value="In a Relationship">In a Relationship</option>
            <option value="Engaged">Engaged</option>
            <option value="Maried">Maried</option>
        </select>
      </div>

      <div className="button-wrapper">
        <button className="white" type='reset'>cancel</button>
        <button className="blue" type="submit">save</button>
      </div>
    </form>
  );
};

export default UserInfoForm;
