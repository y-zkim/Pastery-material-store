import React, { Component } from "react";
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import LivraisonInfosDash from "../dashboard/LivraisonInfosDash";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class CommandeTraking extends Component {
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

      showEtat = () => {
        if(this.state.facture.commande.etat == "commandé"){
            return <h3 className="font-bold text-gray-400 italic">Commandé</h3> ;
        } else if(this.state.facture.commande.etat == "en_traitement"){
            return <h3 className="font-bold text-red-400 italic">En traitement</h3> ;
        } else if(this.state.facture.commande.etat == "traité"){
          return <h3 className="font-bold text-yellow-400 italic">Traité</h3> ;
        } else if(this.state.facture.commande.etat == "en_livraison"){
          return <h3 className="font-bold text-green-400 italic">En livraison</h3> ;
        } else if(this.state.facture.commande.etat == "livrée"){
            return <h3 className="font-bold text-blue-400 italic">Livrée</h3> ;
        } else if(this.state.facture.commande.etat == "Annulé"){
          return <h3 className="font-bold text-third italic">Annulé</h3> ;
        }
      }
    
      render() {
        return (
            <div className="rounded-xl shadow-xl text-center py-3 border-2 border-primary my-2">
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
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Etat :</td>
                    <td>{this.showEtat()}</td>
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
          </div>
        );
      }
}
 
export default CommandeTraking;