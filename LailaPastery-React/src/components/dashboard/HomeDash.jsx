import React, { Component } from "react";
import Logo from "../../assets/Logo.png";

class HomeDash extends Component {
  state = {};
  render() {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="h-64" src={Logo} alt="Logo" />
      </div>
    );
  }
}

export default HomeDash;
