import React, { Component } from "react";
import ProduitsCart from "./ProduitsCart";
import TotalCart from "./TotalCart";
import NoProductFound from "../searchPageComponents/NoProductFound";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produits: this.props.commande.produits,
      totalCart: 0,
    };
  }

  componentWillMount() {
    let totalCart = this.state.produits
      .reduce(
        (a, v) =>
          (a =
            a +
            v.pivot.quantite *
              (v.promotion == null
                ? v.prixProduit
                : v.prixProduit *
                  (1 - v.promotion.valeurPromo / 100))),
        0
      )
      .toFixed(2);
    this.setState({ totalCart });
  }

  handleEditProduit = (produit) => {
    const produits = [...this.state.produits];
    let prod = this.state.produits.filter((pro) => pro.id == produit.id);
    const index = produits.indexOf(prod);
    if (index !== null) {
      produits[index] = { ...produit };
      let totalCart = this.state.totalCart;
      totalCart = produits
      .reduce(
        (a, v) =>
          (a =
            a +
            v.pivot.quantite *
              (v.promotion == null
                ? v.prixProduit
                : v.prixProduit *
                  (1 - v.promotion.valeurPromo / 100))),
        0
      )
      .toFixed(2);
      this.props.updateProduitInCommande(produit.id, produit.pivot.quantite);
      this.setState({ produits, totalCart });
    }
  };

  handleDeleteProduit = (idProduit) => {
    this.props.removeProduitFromCommande(idProduit);
    const produits = this.state.produits.filter(
      (prod) => prod.id !== idProduit
    );
    let totalCart = this.state.totalCart;
    totalCart = produits
      .reduce((a, v) => (a = a + v.quantity * v.price), 0)
      .toFixed(2);
    this.setState({ produits, totalCart });
  };

  LoadCard = () => {
    if(this.state.produits.length === 0) {
      return <NoProductFound />;
    } else {
      return (
        <div className="grid w-full lg:grid-cols-5 text-left">
            <div className="lg:col-span-3">
              <div className="border-b-4 font-bold text-primary italic border-primary my-3 text-lg px-4 py-1">
                Produits
              </div>
              <ProduitsCart
                produits={this.state.produits}
                editProduit={this.handleEditProduit}
                deleteProduit={this.handleDeleteProduit}
                editTotalCart={this.handleEditTotalCart}
              />
            </div>
            <div className="lg:col-span-2 p-5">
              <TotalCart totalCart={this.state.totalCart} />
            </div>
          </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="w-auto xl:px-32 md:px-20 mx-auto mt-10">
          <div className="text-4xl w-full text-center p-5 font-bold text-primary italic">
            Panier
          </div>
          {this.LoadCard()}
        </div>
      </div>
    );
  }
}

export default Cart;
