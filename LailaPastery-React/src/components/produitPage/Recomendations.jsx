import React, { Component } from "react";
import ProduitsRec from "./ProduitsRec";
import Couteau from "../../assets/couteau.jpg";
import cuillere from "../../assets/cuillere.jpg";

class Recomendations extends Component {
  state = {
    produits: [
      {
        id: 1,
        enStock: true,
        favorite: true,
        picture: <img className="w-24 h-24" src={cuillere} alt="" />,
        nom: "Cuillère à glace portionneuse",
        rate: 3,
        price: 120.99,
        promotion: 79.95,
        inCart: false,
      },
      {
        id: 2,
        enStock: false,
        favorite: false,
        picture: <img className="w-24 h-24" src={Couteau} alt="" />,
        nom: "Couteau-scie à génoise",
        rate: 5,
        price: 87.99,
        promotion: 0,
        inCart: true,
      },
      {
        id: 3,
        enStock: true,
        favorite: true,
        picture: <img className="w-24 h-24" src={cuillere} alt="" />,
        nom: "Cuillère à glace portionneuse",
        rate: 3,
        price: 120.99,
        promotion: 79.95,
        inCart: false,
      },
      {
        id: 4,
        enStock: false,
        favorite: false,
        picture: <img className="w-24 h-24" src={Couteau} alt="" />,
        nom: "Couteau-scie à génoise",
        rate: 5,
        price: 87.99,
        promotion: 0,
        inCart: true,
      },
      {
        id: 5,
        enStock: true,
        favorite: true,
        picture: <img className="w-24 h-24" src={cuillere} alt="" />,
        nom: "Cuillère à glace portionneuse",
        rate: 3,
        price: 120.99,
        promotion: 79.95,
        inCart: false,
      },
      {
        id: 6,
        enStock: false,
        favorite: false,
        picture: <img className="w-24 h-24" src={Couteau} alt="" />,
        nom: "Couteau-scie à génoise",
        rate: 5,
        price: 87.99,
        promotion: 0,
        inCart: true,
      },
    ],
  };

  changeProduit = (produit) => {
    const produits = [...this.state.produits];
    const index = produits.indexOf(produit);
    produits[index] = { ...produit };
    this.setState({ produits });
  };

  render() {
    return (
      <div className="my-5 bg-secondary shadow-xl">
        <h1 className="text-center text-third font-serif italic font-bold text-2xl my-3">
          ON VOUS RECOMMANDE
        </h1>

        <ProduitsRec
          produits={this.state.produits}
          changeProduit={this.changeProduit}
        />
      </div>
    );
  }
}

export default Recomendations;
