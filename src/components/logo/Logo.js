import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import Ape from "./ape-icon-14.jpg";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 50 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img alt="logo" src={Ape} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
