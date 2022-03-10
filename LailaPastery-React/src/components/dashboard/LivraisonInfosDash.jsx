import React, { Component } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class LivraisonInfosDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      livraison: props.livraison,
    };
  }

  render() {
    const { livraison } = this.state;
    console.log(livraison);
    return (
      <Popup
        trigger={
          <button className="btn rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none">
            <div className="flex items-center">Détail de livraison</div>
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
                  close();
                }}
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-third"> Détails de livraison : </div>
            <div className="w-full p-5">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Nom : </td>
                    <td> {livraison.nomLivraison} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Prénom : </td>
                    <td> {livraison.prenomLivraison} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Email : </td>
                    <td> {livraison.emailLivraison} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Adresse : </td>
                    <td> {livraison.adresseLivraison} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Telephone : </td>
                    <td> {livraison.teleLivraison} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Date de demmande : </td>
                    <td> {livraison.created_at.substring(0, 10)} </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Date estimée pour livré : </td>
                    <td> {livraison.dateEstimeLivraison} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default LivraisonInfosDash;
