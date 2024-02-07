import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const SocialLinks = () => {
  return (
    <div>
      <h3>Social Links</h3>
      <p>
        We may still send you important notifications about your account and
        content outside of you preferred notivications settings
      </p>

      <form>
        <ul>
          <li>
            <div style={{backgroundColor:'rgb(239,246,255)', color:'rgb(37,99,235)'}}>
              <FacebookOutlinedIcon />
            </div>

            <input type="text" />
          </li>

          <li>
            <div style={{backgroundColor:'rgb(253,242,248)', color:'rgb(219,39,119)'}}>
              <InstagramIcon />
            </div>

            <input type="text" />
          </li>

          <li>
            <div style={{backgroundColor:'rgb(248,250,252)', color:'rgb(0, 0, 0)'}}>
              <GitHubIcon />
            </div>

            <input type="text" />
          </li>
        </ul>

        <div className="btn-wrapper">
          <button className="white">cancel</button>
          <button className="blue">save</button>
        </div>
      </form>
    </div>
  );
};

export default SocialLinks;
