import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { SiCodechef } from "react-icons/si";

class UserExistsLoginPopup extends Component {
  state = { user: this.props.user };
  render() {
    return (
      <Popup
        trigger={
          <button className="hover:bg-secondary px-1 py-1 rounded-md text-sm font-medium flex items-center justify-center focus:outline-none">
            <SiCodechef className="text-third h-6 w-6" />
          </button>
        }
        nested
      >
        <div className="text-xs">
          <div className="text-center w-full font-bold capitalize">
            {this.state.user.prenom + " " + this.state.user.nom}
          </div>

          <a href="/Profile">
            <div className="my-2 text-third hover:font-bold border-b-2 hover:bg-secondary border-primary w-full focus:outline-none">
              Mon profile
            </div>
          </a>
          <a href="/track">
            <div className="my-2 text-third hover:font-bold border-b-2 hover:bg-secondary border-primary w-full focus:outline-none">
              Mes commandes
            </div>
          </a>

          <button
            className="mt-2 mb-2 text-red-500 font-bold text-center border hover:bg-red-500 hover:text-white rounded border-red-500 w-full focus:outline-none"
            onClick={() => this.props.logoutUser()}
          >
            Déconnexion
          </button>
        </div>
      </Popup>
    );
  }
}

export default UserExistsLoginPopup;
