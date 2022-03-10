import React, { Component } from "react";
import TopVentesProduits from "./TopVentesProduits";

class TopVentes extends Component {
  state = {
    produits: this.props.produits,
  };

  render() {
    return (
      <div className="my-5">
        <div className="grid w-full grid-cols-6 items-center my-2">
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
          <div className="col-span-2">
            <h5 className="font-serif font-bold italic text-primary text-center text-xl">
              Top des Ventes
            </h5>
          </div>
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
        </div>

        <TopVentesProduits
          produits={this.state.produits}
          produitsCommande={this.props.produitsCommande}
          addProduitToCommande={this.props.addProduitToCommande}
          removeProduitFromCommande={this.props.removeProduitFromCommande}
        />
      </div>
    );
  }
}

export default TopVentes;
