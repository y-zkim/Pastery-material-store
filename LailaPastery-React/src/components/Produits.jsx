import React, { Component } from "react";
import Produit from "./Produit";
import Loader from "react-loader-spinner";

class Produits extends Component {
  state = {
    isLoaded: false,
  };

  componentWillMount() {
    if (this.props.produits !== null) {
      this.setState({ isLoaded: true });
    }
  }

  loadDone = () => {
    if (this.state.isLoaded) {
      return (
        <div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mx-auto">
            {this.props.produits.map((produit) => {
              return (
                <Produit
                  key={produit.id}
                  produit={produit}
                  inCart={this.checkInCart(produit)}
                  changeProduit={this.props.changeProduit}
                  addProduitToCommande={this.props.addProduitToCommande}
                  removeProduitFromCommande={
                    this.props.removeProduitFromCommande
                  }
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center w-full">
          <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
        </div>
      );
    }
  };

  checkInCart = (produit) => {
    let inCart = false;
    this.props.produitsCommande.map((produitCommande) => {
      if (produitCommande.id === produit.id) inCart = true;
    });
    return inCart;
  };

  render() {
    return this.loadDone();
  }
}

export default Produits;
