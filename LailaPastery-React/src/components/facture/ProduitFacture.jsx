import React, { Component } from "react";

class ProduitFacture extends Component {
  state = {
    produit: this.props.produit,
  };

  render() {
    return (
      <div className="w-full border-b-2 flex items-center ">
        <div className="h-16 w-32 mx-2 flex items-center">
          <img
            src={
              "http://localhost:8000/" +
              this.state.produit.images[0].image_content
            }
            className="h-12"
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="font-bold text-sm italic">
            {this.state.produit.titreProduit}
          </div>
          <div className="text-gray-500 text-xs italic">
            {this.state.produit.marque}
          </div>
          <div className=" bg-secondary border border-primary rounded-lg flex items-center w-8 text-center">
            <div className=" text-sm font-sans font-bold px-1 w-full">
              {this.props.produit.pivot.quantite}
            </div>
          </div>
        </div>
        <div className="w-32 font-bold text-primary text-sm">
          <div className="flex justify-end ">
            {this.state.produit.pivot.quantite *
              (this.state.produit.promotion == null
                ? this.state.produit.prixProduit
                : this.state.produit.prixProduit -
                  (this.state.produit.prixProduit *
                    this.state.produit.promotion.valeurPromo) /
                    100
              ).toFixed(2)}
            &nbsp;DH
          </div>
        </div>
      </div>
    );
  }
}

export default ProduitFacture;
