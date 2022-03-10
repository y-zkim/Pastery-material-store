import React, { Component } from "react";
import ProduitFacture from "./ProduitFacture";

class ProduitsFacture extends Component {
  state = {
    produits: this.props.produits,
  };

  render() {
    this.state.produits = this.props.produits;
    return (
      <div>
        {this.state.produits.map((produit) => {
          return <ProduitFacture key={produit.id} produit={produit} />;
        })}
      </div>
    );
  }
}

export default ProduitsFacture;
