import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Notifications = () => {
  return (
    <section>
      <div>
        <div className="wrapper">
          <div className="left">Notify me when:</div>

          <div className="right">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone send me message"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone liked my photo"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone followed me"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone liked my posts"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone sent me follow requset"
              />
            </FormGroup>
          </div>
        </div>
      </div>


      <div className="button-wrapper">
        <button className="light">cancel</button>
        <button className="blue">save</button>
      </div>
    </section>
  );
};

export default Notifications;
