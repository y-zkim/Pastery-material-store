import React, { Component } from "react";
import { RiAlarmWarningLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";

class TotalCart extends Component {
  state = {
    totalCart: this.props.totalCart,
  };

  livraisonMessage = () => {
    if (this.state.totalCart < 500) {
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
    this.state.totalCart = this.props.totalCart;
    return (
      <div className="border-4 border-primary rounded-xl px-5 py-2 w-full text-center">
        <div className="border-b-2 border-primary  text-primary italic font-bold text-lg">
          Totale des achats
        </div>
        <div className="">Votre montant totale est :</div>
        <div className="text-lg text-third italic text-2xl font-bold">
          {this.state.totalCart}&nbsp;DH
        </div>
        {this.livraisonMessage()}
        <div className="flex justify-center px-5 py-2">
          <a
            href="/Facture"
            className="btn rounded-xl py-1 px-3 flex items-center bg-primary font-bold text-white border focus:outline-none hover:text-primary hover:bg-white hover:border-primary w-full flex justify-center"
          >
            Passer La Commande
          </a>
        </div>
      </div>
    );
  }
}

export default TotalCart;
