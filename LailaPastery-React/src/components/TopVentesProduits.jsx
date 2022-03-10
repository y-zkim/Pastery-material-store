import React, { Component } from "react";
import Produit from "./Produit";
import Loader from "react-loader-spinner";

class TopVentesProduits extends Component {
  state = {
    produits: this.props.produits,
  };

  checkInCart = (produit) => {
    let inCart = false;
    this.props.produitsCommande.map((produitCommande) => {
      if (produitCommande.id === produit.id) inCart = true;
    });
    return inCart;
  };

  render() {
    return (
      <div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 grid-cols-2 mt-3 mx-auto">
          {this.props.produits.map((produit) => {
            return (
              <Produit
                key={produit.id}
                produit={produit}
                inCart={this.checkInCart(produit)}
                addProduitToCommande={this.props.addProduitToCommande}
                removeProduitFromCommande={this.props.removeProduitFromCommande}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TopVentesProduits;
