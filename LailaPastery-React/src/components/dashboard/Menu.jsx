import React, { Component } from "react";
import Logo from "../../assets/Logo.png";
import { MdDashboard, MdLocalOffer, MdStyle } from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaLuggageCart, FaUserTie, FaHistory } from "react-icons/fa";
import { RiBillFill, RiSlideshow2Fill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { IoNewspaper } from "react-icons/io5";
import { ImExit } from "react-icons/im";

class Menu extends Component {
  state = {};

  handleButtonsStyle = (nbrBtn) => {
    if (nbrBtn === this.props.choosenView) {
      return "btn rounded-lg shadow-xl p-2 my-2 bg-primary font-bold italic text-secondary w-full focus:outline-none";
    } else {
      return "btn rounded-lg shadow-xl p-2 my-2 hover:bg-primary text-primary font-bold italic hover:text-secondary w-full focus:outline-none";
    }
  };

  render() {
    return (
      <div className="px-2 py-2 w-full">
        <div className="flex justify-center">
          <img className="h-16 lg:h-32" src={Logo} alt="Logo" />
        </div>

        <div className="py-5 w-full h-full">
          <button
            className={this.handleButtonsStyle(0)}
            onClick={() => this.props.editChoosenView(0)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <MdDashboard className="w-7 h-7" />
              <span className="w-full hidden md:block">Dashboard</span>
            </div>
          </button>
          
          <button
            className={this.handleButtonsStyle(1)}
            onClick={() => this.props.editChoosenView(1)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <RiSlideshow2Fill className="w-7 h-7" />
              <span className="w-full hidden md:block">Banniére</span>
            </div>
          </button>

          <button
            className={this.handleButtonsStyle(2)}
            onClick={() => this.props.editChoosenView(2)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <GiForkKnifeSpoon className="w-7 h-7" />
              <span className="w-full hidden md:block">Produits</span>
            </div>
          </button>
          
          <button
            className={this.handleButtonsStyle(3)}
            onClick={() => this.props.editChoosenView(3)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <MdLocalOffer className="w-7 h-7" />
              <span className="w-full hidden md:block">Promotions</span>
            </div>
          </button>
          <button
            className={this.handleButtonsStyle(4)}
            onClick={() => this.props.editChoosenView(4)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <MdStyle className="w-7 h-7" />
              <span className="w-full hidden md:block">Catégories</span>
            </div>
          </button>
          <button
            className={this.handleButtonsStyle(5)}
            onClick={() => this.props.editChoosenView(5)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <FaLuggageCart className="w-7 h-7" />
              <span className="w-full hidden md:block">Commandes</span>
            </div>
          </button>

          <button
            className={this.handleButtonsStyle(6)}
            onClick={() => this.props.editChoosenView(6)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <RiBillFill className="w-7 h-7" />
              <span className="w-full hidden md:block">Factures</span>
            </div>
          </button>
          
          <button
            className={this.handleButtonsStyle(7)}
            onClick={() => this.props.editChoosenView(7)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <FaHistory className="w-7 h-7" />
              <span className="w-full hidden md:block">Historique</span>
            </div>
          </button>

          <button
            className={this.handleButtonsStyle(8)}
            onClick={() => this.props.editChoosenView(8)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <AiFillSetting className="w-7 h-7" />
              <span className="w-full hidden md:block">Admines</span>
            </div>
          </button>
          <button
            className={this.handleButtonsStyle(9)}
            onClick={() => this.props.editChoosenView(9)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <IoNewspaper className="w-7 h-7" />
              <span className="w-full hidden md:block">Newsletter</span>
            </div>
          </button>
          <button
            className={this.handleButtonsStyle(10)}
            onClick={() => this.props.editChoosenView(10)}
          >
            <div className="flex items-center justify-start md:justify-center">
              <FaUserTie className="w-7 h-7" />
              <span className="w-full hidden md:block">Profile</span>
            </div>
          </button>
        </div>

        <div className="w-full">
          <button
            onClick={() => this.props.logoutUser()}
            className="btn rounded-lg shadow-xl p-2 my-2 hover:bg-primary text-primary font-bold italic hover:text-secondary w-full focus:outline-none"
          >
            <div className="flex items-center justify-start md:justify-center">
              <ImExit className="w-7 h-7" />
              <span className="w-full hidden md:block">Déconnexion</span>
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
