import React, { Component } from "react";
import { RiAlarmWarningLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";

class TotalFacture extends Component {
  state = {
    totalAchats: this.props.totalAchats,
    totalLivraison: this.props.totalLivraison,
    totalFacture: this.props.totalFacture,
  };

  livraisonMessage = () => {
    if (this.state.totalAchats < 500) {
      return (
        <div className="text-xs flex justify-center items-end">
          <RiAlarmWarningLine className="h-5 w-5 mr-1" />
          Si vous dépassez 500 dh la livraison va être gratuit !
        </div>
      );
    } else {
      return (
        <div className="text-xs flex justify-center items-end">
          <HiOutlineLightBulb className="h-5 w-5 mr-1" />
          Votre commande va être livrer gratuitement !
        </div>
      );
    }
  };

  render() {
    return (
      <div className="border-4 border-primary rounded-xl px-5 py-2 w-full text-center">
        <div className="border-b-2 border-primary  text-primary italic font-bold text-lg">
          Totale des achats
        </div>
        <div className="w-full px-5 text-left">
          <div className="grid grid-row-2">
            <div className="grid grid-cols-2">
              <div className="italic font-bold text-sm">
                Montant des achats :
              </div>
              <div className="text-lg text-third italic text-2xl font-bold text-right">
                {this.state.totalAchats}&nbsp;DH
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="italic font-bold text-sm">
                Montant de Livraison :
              </div>
              <div className="text-lg text-third italic text-2xl font-bold text-right">
                {this.state.totalLivraison}&nbsp;DH
              </div>
            </div>
          </div>
          {this.livraisonMessage()}
          <div className="grid grid-cols-2 mt-2">
            <div className="italic font-bold text-sm">Montant de Facture :</div>
            <div className="text-lg text-third italic text-2xl font-bold text-right">
              {this.state.totalFacture}&nbsp;DH
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalFacture;
