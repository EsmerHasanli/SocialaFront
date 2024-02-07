import React from "react";

const PasswordReset = () => {
  return (
    <div>
      <form>
        <div className="form-wrapper">
            <div>
            <label style={{ marginBottom: "26px" }} htmlFor="">
                Current Password
            </label>
            <label style={{ marginBottom: "26px" }} htmlFor="">
                New Password
            </label>
            <label style={{ marginBottom: "26px" }} htmlFor="">
                Repeat Password
            </label>
            </div>
            
            <div>
            <input style={{ marginBottom: "26px" }} type="text" />
            <input style={{ marginBottom: "26px" }} type="text" />
            <input style={{ marginBottom: "26px" }} type="text" />
            </div>
        </div>

        <div className="button-wrapper">
          <button className="light">cancel</button>
          <button className="blue">save</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
