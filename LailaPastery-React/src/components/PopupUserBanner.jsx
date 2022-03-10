import React, { Component } from "react";
import UserExistsLoginPopup from "./UserExistsLoginPopup";
import UserDontExistLoginPopup from "./UserDontExistLoginPopup";

class PopupUserBanner extends Component {
  state = {
    // user: {
    //   id: 1,
    //   nom: "Manouz",
    //   prenom: "Ayoub",
    //   email: "ayoubmanouz2015@gmail.com",
    // },
    user: this.props.user,
  };

  render() {
    if (this.state.user == null)
      return (
        <UserDontExistLoginPopup
          addUser={this.props.addUser}
          loginUser={this.props.loginUser}
        />
      );
    else
      return (
        <UserExistsLoginPopup
          user={this.state.user}
          logoutUser={this.props.logoutUser}
        />
      );
  }
}

export default PopupUserBanner;
