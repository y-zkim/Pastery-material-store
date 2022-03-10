import React, { Component } from "react";
import EditCommande from "./EditCommande";

class CommandeDash extends Component {
  state = {
    facture: this.props.facture,
  };

  showEtat = () => {
    if(this.state.facture.commande.etat == "commandé"){
      return <h3 className="font-bold text-red-500 italic">Commandé</h3> ;
    } else if(this.state.facture.commande.etat == "en_traitement"){
      return <h3 className="font-bold text-green-400 italic">En traitement</h3> ;
    } else {
      return <h3 className="font-bold italic">{this.state.facture.commande.etat}</h3> ;
    }
  }

  render() {
    return (
      <tr className="border-b-2 text-center">
        <td>{this.state.facture.commande.id}</td>
        <td>{this.state.facture.commande.produits.length}</td>
        <td>{this.showEtat()}</td>
        <td>{this.state.facture.totalFacture}&nbsp;DH</td>
        <td>{this.state.facture.livraison.created_at.substring(0, 10)}</td>
        <td>
          <EditCommande
            facture={this.state.facture}
            changeCommande={this.props.changeCommande}
          />
        </td>
      </tr>
    );
  }
}

export default CommandeDash;
