import React, { Component } from "react";
import ProduitsFacture from "./ProduitsFacture";
import TotalFacture from "./TotalFacture";
import PaiementInfos from "./PaiementInfos";
import Loader from "react-loader-spinner";

class Facture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produits: [],
      totalAchats: 0,
      totalLivraison: 0,
      totalFacture: 0,
      isLoaded: false,
    };
  }

  componentWillMount() {
    let produits = this.props.commande.produits;
    let totalAchats = produits
      .reduce(
        (a, v) =>
          (a =
            a +
            v.pivot.quantite *
              (v.promotion == null
                ? v.prixProduit
                : v.prixProduit -
                  (v.prixProduit * v.promotion.valeurPromo) / 100)),
        0
      )
      .toFixed(2);

    let totalLivraison = 0;
    if (totalAchats < 500) {
      totalLivraison = 50.0;
    }
    let totalFacture = parseFloat(totalAchats) + parseFloat(totalLivraison);
    this.setState({
      produits,
      totalAchats,
      totalLivraison,
      totalFacture,
      isLoaded: true,
    });
  }

  handleIsLoaded = () => {
    console.log(this.state.totalFacture);
    if (this.state.isLoaded) {
      return (
        <div className="grid w-full lg:grid-cols-6 text-left">
          <div className="lg:col-span-3">
            <div className="border-b-4 font-bold text-primary italic border-primary my-3 text-lg px-4 py-1">
              Produits
            </div>
            <ProduitsFacture produits={this.state.produits} />
          </div>
          <div className="lg:col-span-3 p-5">
            <TotalFacture
              totalFacture={this.state.totalFacture}
              totalAchats={this.state.totalAchats}
              totalLivraison={this.state.totalLivraison}
            />
            <PaiementInfos
              user={this.props.user}
              pay={this.props.pay}
              totalFacture={this.state.totalFacture}
            />
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
  render() {
    return (
      <div>
        <div className="w-auto xl:px-32 md:px-20 mx-auto mt-10">
          <div className="text-4xl w-full text-center p-5 font-bold text-primary italic">
            Facture
          </div>
          {this.handleIsLoaded()}
        </div>
      </div>
    );
  }
}

export default Facture;
