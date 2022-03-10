import React, { Component } from "react";
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import LivraisonInfosDash from "./LivraisonInfosDash";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class EditFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facture: props.facture,
      produits: props.facture.commande.produits,
      commande: props.facture.commande,
    };
  }

  initializeCommande = () => {
    this.setState({ commande: this.props.facture.commande });
  };

  handlePromotionValue = (produit) => {
    if (produit.promotion === null) {
      return "-";
    } else {
      return "- " + produit.promotion.valeurPromo + " %";
    }
  };

  // setChecked = (etat) => {
  //   if (this.state.commande.etat == etat) {
  //     return (
  //       <input
  //         type="radio"
  //         name="etat"
  //         checked
  //         onClick={() => {
  //           let commande = this.state.commande;
  //           commande.etat = etat;
  //           this.setState({ commande: commande });
  //         }}
  //       />
  //     );
  //   } else {
  //     return (
  //       <input
  //         type="radio"
  //         name="etat"
  //         onClick={() => {
  //           let commande = this.state.commande;
  //           commande.etat = etat;
  //           this.setState({ commande: commande });
  //         }}
  //       />
  //     );
  //   }
  // };

  etatButton = () => {
    if(this.state.commande.etat == 'traité') {
      return <button
      className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
      onClick={() => {
        let commande = this.state.commande;
        commande.etat = "en_livraison";
        this.props.changeCommande(commande);
      }}
    >
      Passe au livraison
    </button>;
    } else if(this.state.commande.etat == 'en_livraison') {
      return <button
      className="btn rounded-lg py-1 px-3 text-white bg-green-500 hover:text-green-500 hover:bg-white border hover:border-green-500 mx-5 focus:outline-none"
      onClick={() => {
        let commande = this.state.commande;
        commande.etat = "livrée";
        this.props.changeCommande(commande);
      }}
    >
      Fin de livraison
    </button>;
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <button className="btn rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none">
            <div className="flex items-center">
              <BiDetail className="w-5 h-5" />
            </div>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="rounded-xl shadow-xl text-center py-3">
            <div className="close flex justify-end">
              <button
                className="btn focus:outline-none rounded-xl text-red-500 hover:text-white hover:bg-red-500"
                onClick={() => {
                  this.initializeCommande();
                  close();
                }}
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-third"> Détails du Commande : </div>
            <div className="w-full p-5">
              <table className="w-full text-xs">
                <tbody>

                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Informations de Livraison :</td>
                    <td>
                      <LivraisonInfosDash
                        livraison={this.state.facture.livraison}
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Totale de facture :</td>
                    <td>{this.state.facture.totalFacture}&nbsp;DH</td>
                  </tr>
                </tbody>
              </table>
              <div className="m-5 rounded-xl border bg-white shadow-2xl">
                <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
                  <div className="">Produits</div>
                </div>
                <div className="w-full h-64 overflow-y-auto">
                  <table className="w-full">
                    <thead className="border-b-2">
                      <tr>
                        <th>Réferance</th>
                        <th>Image</th>
                        <th>Titre</th>
                        <th>Quantité</th>
                        <th>Prix Totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.produits.map((produit) => {
                        return (
                          <tr>
                            <td>{produit.reference}</td>
                            <td>
                              <div className="flex justify-center w-full">
                                <img
                                  src={
                                    "http://localhost:8000/" +
                                    produit.images[0].image_content
                                  }
                                  className="h-16"
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>{produit.titreProduit}</td>
                            <td>{produit.pivot.quantite}</td>
                            <td>{produit.pivot.prixElement}&nbsp;DH</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="actions">
              {this.etatButton()}
              <button
                className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                onClick={() => {
                  close();
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default EditFacture;
