import React, { Component } from "react";
import CartDontExsistLoginPopup from "./CartDontExsistLoginPopup";
import { FaShoppingBasket } from "react-icons/fa";

class CartButtonHandler extends Component {
  state = {};
  render() {
    if (this.props.user == null) {
      return (
        <CartDontExsistLoginPopup
          addUser={this.props.addUser}
          loginUser={this.props.loginUser}
        />
      );
    } else {
      return (
        <a
          href="/panier"
          className="hover:bg-secondary px-1 py-1 rounded-md text-sm font-medium flex items-center justify-center relative focus:outline-none"
        >
          <FaShoppingBasket className="text-third h-6 w-6" />
          <span className="absolute right-0 top-0 rounded-full bg-primary w-4 h-4 top right p-0 m-0 text-white text-xs leading-tight text-center">
            {this.props.commande.produits.length}
          </span>
        </a>
      );
    }
  }
}

export default CartButtonHandler;
