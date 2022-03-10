import React, { Component } from "react";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class ProduitCart extends Component {
  state = {
    produit: this.props.produit,
  };

  popupDeleteProduit = (
    <Popup
      trigger={
        <button className="btn rounded shadow-lg p-2 bg-red-500 hover:bg-red-100 text-white font-bold italic hover:text-red-500 focus:outline-none">
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
            Vous êtes sur que vous voulez retirer le produit{" "}
            {this.state.produit.id} du panier ?
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
                console.log("modal closed ");
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

  render() {
    return (
      <div className="w-full border-b-2 flex items-center p-2">
        <div className="h-16 w-32 mx-2">
          <img
            src={
              "http://localhost:8000/" +
              this.state.produit.images[0].image_content
            }
            className="h-16"
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="font-bold text-lg italic">
            {this.state.produit.titreProduit}
          </div>
          <div className="text-gray-500 text-xs italic">
            {this.state.produit.marque}
          </div>
          <div className="flex">
            <div className="grid grid-cols-2 bg-secondary border border-primary rounded-lg flex items-center w-12">
              <div className="col-span-1 text-sm font-sans font-bold px-1">
                {this.props.produit.pivot.quantite}
              </div>
              <div className="col-span-1">
                <div className="grid grid-rows-2">
                  <button
                    className="row-span-1 btn flex justify-center hover:text-secondary hover:bg-primary hover:border-primary border hover:border rounded-tr-lg focus:outline-none"
                    onClick={() => {
                      if (this.state.produit.pivot.quantite < this.state.produit.stockProduit) {
                        this.state.produit.pivot.quantite++;
                        this.props.editProduit(this.state.produit);
                      }
                    }}
                  >
                    <BsChevronCompactUp className="h-3" />
                  </button>
                  <button
                    className="row-span-1 btn flex justify-center hover:text-secondary hover:bg-primary hover:border-primary border hover:border rounded-br-lg focus:outline-none"
                    onClick={() => {
                      if (this.state.produit.pivot.quantite > 0) {
                        this.state.produit.pivot.quantite--;
                        this.props.editProduit(this.state.produit);
                      }
                    }}
                  >
                    <BsChevronCompactDown className="h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="font-bold text-xl text-primary mx-5">
              {this.state.produit.promotion == null
                ? (
                <span className={"text-lg font-bold text-primary"}>
                  {Math.floor(this.state.produit.prixProduit)}
                  <sup>
                    ,
                    {(
                      this.state.produit.prixProduit -
                      Math.floor(this.state.produit.prixProduit) * 1.0
                    ).toFixed(2) * 100}
                  </sup>
                  <sub>{"DH TTC"}</sub>
                </span>
                ) : (
                <span className={"text-lg font-bold text-primary"}>
                  {Math.floor(
                    this.state.produit.prixProduit -
                      (this.state.produit.promotion.valeurPromo * this.state.produit.prixProduit) / 100
                  )}
                  <sup>
                    ,
                    {(
                      this.state.produit.prixProduit -
                      (this.state.produit.promotion.valeurPromo * this.state.produit.prixProduit) / 100 -
                      Math.floor(
                        this.state.produit.prixProduit -
                          (this.state.produit.promotion.valeurPromo * this.state.produit.prixProduit) / 100
                      ) *
                        1.0
                    ).toFixed(2) * 100}
                  </sup>
                  <sub>{"DH TTC"}</sub>
                  <sub className="text-sm text-gray-700">
                    &nbsp;&nbsp;
                    <strike>{Math.floor(this.state.produit.prixProduit)}</strike>
                    <sup>
                      ,
                      {(
                        this.state.produit.prixProduit -
                        Math.floor(this.state.produit.prixProduit) * 1.0
                      ).toFixed(2) * 100}
                    </sup>
                    <sub>{"DH TTC"}</sub>
                  </sub>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-32 font-bold text-primary text-lg">
          <div className="flex justify-end ">
            {(
              (this.state.produit.promotion == null
                ? this.state.produit.prixProduit
                : this.state.produit.prixProduit -
                  (this.state.produit.prixProduit *
                    this.state.produit.promotion.valeurPromo) /
                    100) * this.state.produit.pivot.quantite
            ).toFixed(2)}
            &nbsp;DH
          </div>
          <div className="flex justify-end ">{this.popupDeleteProduit}</div>
        </div>
      </div>
    );
  }
}

export default ProduitCart;
