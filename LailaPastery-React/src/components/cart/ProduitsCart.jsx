import React, { Component } from "react";
import ProduitCart from "./ProduitCart";

class ProduitsCart extends Component {
  state = {
    produits: this.props.produits,
  };

  render() {
    this.state.produits = this.props.produits;
    return (
      <div>
        {this.state.produits.map((produit) => {
          return (
            <ProduitCart
              key={produit.id}
              produit={produit}
              editProduit={this.props.editProduit}
              deleteProduit={this.props.deleteProduit}
            />
          );
        })}
      </div>
    );
  }
}

export default ProduitsCart;
