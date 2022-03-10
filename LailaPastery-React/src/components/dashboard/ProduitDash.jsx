import React, { Component } from "react";
import { MdDeleteForever } from "react-icons/md";
import EditProduitDash from "./EditProduitDash";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class ProduitDash extends Component {
  state = {
    produit: this.props.produit,
  };

  popupDeleteProduit = (
    <Popup
      trigger={
        <button className="btn rounded shadow-lg p-2 bg-red-400 hover:bg-red-100 text-white font-bold italic hover:text-red-400 focus:outline-none">
          <div className="flex items-center">
            <MdDeleteForever className="w-5 h-5" />
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
              onClick={close}
            >
              <FaTimesCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="font-bold text-third"> Suppression du produit : </div>
          <div className="w-full p-5">
            Vous êtes sur que vous voulez supprimer le produit{" "}
            {this.state.produit.id} ?
          </div>
          <div className="actions">
            <button
              className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
              onClick={() => this.props.deleteProduit(this.state.produit.id)}
            >
              Supprimer
            </button>

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

  handlePromotionValue = () => {
    if (this.state.produit.promotion === null) {
      return "-";
    } else {
      return "- " + this.state.produit.promotion.valeurPromo + " %";
    }
  };

  showImage = () => {
    if (this.state.produit.images[0] !== undefined) {
      return (
        <img
          src={
            "http://localhost:8000/" +
            this.state.produit.images[0].image_content
          }
          className="h-16"
          alt=""
        />
      );
    }
  };

  render() {
    return (
      <tr className="border-b-2 text-center">
        <td>{this.state.produit.reference}</td>
        <td>
          <div className="flex justify-center w-full">{this.showImage()}</div>
        </td>
        <td>{this.state.produit.titreProduit}</td>
        <td>{this.state.produit.prixProduit} DH</td>
        <td>{this.handlePromotionValue()}</td>
        <td>{this.state.produit.stockProduit}</td>
        <td>
          <EditProduitDash
            produit={this.state.produit}
            changeProduit={this.props.changeProduit}
          />
        </td>
        <td>{this.popupDeleteProduit}</td>
      </tr>
    );
  }
}

export default ProduitDash;
