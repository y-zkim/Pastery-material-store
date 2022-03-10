import React, { Component } from "react";
import ProduitPhotos from "./ProduitPhotos";
import SellingDetails from "./SellingDetails";
import DescriptionPage from "./DescriptionPage";
import Recomendations from "./Recomendations";

class ProduitLoaded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
      quantite: 1,
      produit: props.produit,
    };
  }

  componentWillMount() {
    this.checkProductInCart();
  }

  checkProductInCart = () => {
    let inCart = false;
    let quantite = 1;
    if (this.props.commande != null) {
      for (let i = 0; i < this.props.commande.produits.length; i++) {
        if (this.props.commande.produits[i].id == this.props.produit.id) {
          inCart = true;
          quantite = this.props.commande.produits[i].pivot.quantite;
          break;
        }
      }
      this.setState({ inCart, quantite });
    }
  };

  handleChangeInCart = (InCart) => {
    if (InCart) {
      this.props.addProduitToCommande(
        this.state.produit.id,
        this.state.quantite
      );
    } else {
      this.props.removeProduitFromCommande(
        this.state.produit.id,
        this.state.quantite
      );
    }
    let inCart = this.state.inCart;
    inCart = InCart;
    this.setState({ inCart });
  };

  handleChangeProduit = (produit) => {
    let stateProduit = this.state.produit;
    stateProduit = produit;
    this.setState({ stateProduit });
  };

  incrementQuantite = () => {
    let quantite = this.state.quantite;
    if (this.state.quantite < this.state.produit.stockProduit ) {
      quantite++;
      this.setState({ quantite });
    }
  };

  decrementQuantite = () => {
    let quantite = this.state.quantite;
    if (this.state.quantite > 1) {
      quantite--;
      this.setState({ quantite });
    }
  };

  render() {
    return (
      <div>
        <div className="w-auto xl:px-32 md:px-20 mx-auto mt-10">
          <div className="grid w-full lg:grid-cols-2">
            <div className="lg:col-span-1">
              <ProduitPhotos images={this.state.produit.images} />
            </div>

            <div className="lg:col-span-1">
              <SellingDetails
                produit={this.state.produit}
                inCart={this.state.inCart}
                quantite={this.state.quantite}
                incrementQuantite={this.incrementQuantite}
                decrementQuantite={this.decrementQuantite}
                handleChangeInCart={this.handleChangeInCart}
              />
            </div>
          </div>

          <DescriptionPage description={this.state.produit.descProduit} />
        </div>
      </div>
    );
  }
}

export default ProduitLoaded;
