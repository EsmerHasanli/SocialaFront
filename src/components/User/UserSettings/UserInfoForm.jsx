import React from "react";

const UserInfoForm = () => {
  return (
    <div>
      <form>
        <div className="form-wrapper">
          <div>
            <label style={{marginBottom:'34px'}} htmlFor="name">Name</label>
            <label style={{marginBottom:'34px'}} htmlFor="surname">Surname</label>
            <label style={{marginBottom:'34px'}} htmlFor="username">Username</label>
            <label style={{marginBottom:'34px'}} htmlFor="email">Email</label>
            <label style={{marginBottom:'34px'}} htmlFor="bio">Bio</label>
            <label style={{marginBottom:'34px'}} htmlFor="gender">Gender</label>
            <label style={{marginBottom:'34px'}} htmlFor="relationship">Relationship</label>
          </div>

          <div>
            <input  style={{marginBottom:'26px'}} id="name" name="name" type="text" />
            <input  style={{marginBottom:'26px'}} id="surname" name="surname" type="text" />
            <input  style={{marginBottom:'26px'}} id="username" name="username" type="text" />
            <input  style={{marginBottom:'26px'}} id="email" name="email" type="email" />
            <textarea  style={{marginBottom:'26px'}} id="bio" name="bio" />
            <select  style={{marginBottom:'26px'}} name="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="None">None</option>
            </select>
            <select  style={{marginBottom:'26px'}} name="relationship" id="relationship">
              <option value="None">None</option>
              <option value="Single">Single</option>
              <option value="In a Relationship">In a Relationship</option>
              <option value="Engaged">Engaged</option>
              <option value="Maried">Maried</option>
            </select>
          </div>
        </div>

        <div className="button-wrapper">
          <button className="white" type="reset">
            cancel
          </button>
          <button className="blue" type="submit">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
