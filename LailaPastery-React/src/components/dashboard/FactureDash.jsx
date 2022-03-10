import React, { Component } from "react";
import EditFacture from "./EditFacture";

class FactureDash extends Component {
  state = {
    facture: this.props.facture,
  };

  showEtat = () => {
    if(this.state.facture.commande.etat == "traité"){
      return <h3 className="font-bold text-primary italic">Traité</h3> ;
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
      <tr className="border-b-2 text-center">
        <td>{this.state.facture.commande.id}</td>
        <td>{this.state.facture.commande.produits.length}</td>
        <td>{this.showEtat()}</td>
        <td>{this.state.facture.totalFacture}&nbsp;DH</td>
        <td>{this.state.facture.livraison.created_at.substring(0, 10)}</td>
        <td>
          <EditFacture
            facture={this.state.facture}
            changeCommande={this.props.changeCommande}
          />
        </td>
      </tr>
    );
  }
}

export default FactureDash;
