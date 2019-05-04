import * as React from 'react';
import "./Footer.css";
const logo = require("../../images/rsg_logo.png");

export default () => {
  return (
    <footer>
      <div className="circle">
        <a href="/">
          <img src={logo} />
        </a>
      </div>
    </footer>
  );
}