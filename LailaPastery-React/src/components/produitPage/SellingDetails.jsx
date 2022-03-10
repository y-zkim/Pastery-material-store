import React, { Component } from "react";
import {
  FaStar,
  FaRegStar,
  FaRegTimesCircle,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import {
  RiHeartAddLine,
  RiShoppingBasket2Line,
  RiHeartFill,
} from "react-icons/ri";

class SellingDetails extends Component {
  state = {};

  rate = () => {
    let table = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.ceil(this.props.produit.rate)) {
        table.push(<FaStar className="text-yellow w-4 h-4" />);
      } else {
        table.push(<FaRegStar className="text-yellow w-4 h-4" />);
      }
    }
    return table;
  };

  price = () => {
    let table = [];
    let produit = this.props.produit;
    if (produit.promotion !== null) {
      table.push(
        <span className={"text-4xl font-bold text-primary"}>
          {Math.floor(
            produit.prixProduit -
              (produit.promotion.valeurPromo * produit.prixProduit) / 100
          )}
          <sup>
            ,
            {(
              produit.prixProduit -
              (produit.promotion.valeurPromo * produit.prixProduit) / 100 -
              Math.floor(
                produit.prixProduit -
                  (produit.promotion.valeurPromo * produit.prixProduit) / 100
              ) *
                1.0
            ).toFixed(2) * 100}
          </sup>
          <sub>{"DH TTC"}</sub>
          <sub className="text-sm text-gray-700">
            &nbsp;&nbsp;
            <strike>{Math.floor(produit.prixProduit)}</strike>
            <sup>
              ,
              {(
                produit.prixProduit -
                Math.floor(produit.prixProduit) * 1.0
              ).toFixed(2) * 100}
            </sup>
            <sub>{"DH TTC"}</sub>
          </sub>
        </span>
      );
    } else {
      table.push(
        <span className={"text-4xl font-bold text-primary"}>
          {Math.floor(produit.prixProduit)}
          <sup>
            ,
            {(
              produit.prixProduit -
              Math.floor(produit.prixProduit) * 1.0
            ).toFixed(2) * 100}
          </sup>
          <sub>{"DH TTC"}</sub>
        </span>
      );
    }

    return table;
  };

  enStock = () => {
    if (this.props.produit.stockProduit != 0) {
      let date = new Date();
      date.setDate(date.getDate() + 15);
      const monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      return (
        <div>
          <div className="flex items-center text-primary font-bold italic text-xs">
            <IoMdCheckmarkCircleOutline className="w-4 h-4" />
            {this.props.produit.stockProduit} {this.props.produit.stockProduit<=1 ? "seul élement reste" : "seuls élements restent"}&nbsp;En&nbsp;Stock
          </div>

          <div className="flex items-center text-primary font-bold italic text-xs">
            <IoMdCheckmarkCircleOutline className="w-4 h-4" />
            &nbsp;
            {"Livraison avant le " +
              date.getDate() +
              " " +
              monthNames[date.getMonth()] +
              " " +
              date.getFullYear() +
              ", gratuit à partir de 500 Dhs d'achats"}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="flex items-center text-third font-bold italic text-xs">
          <FaRegTimesCircle className="w-4 h-4" />
          &nbsp;Ce produit n'est pas valable maintenant
        </div>

        <div className="flex items-center text-third font-bold italic text-xs">
          <IoMdCheckmarkCircleOutline className="w-4 h-4" />
          &nbsp;Ponsez vous a nous contacter pour avoir plus d'informations
        </div>
      </div>
    );
  };

  modifQuantite = () => {
    return (
      <div
        className={
          "grid grid-cols-2 bg-secondary border border-third rounded-lg flex items-center w-20" +
          (this.props.inCart || this.props.produit.stockProduit === 0
            ? " opacity-25"
            : "")
        }
      >
        <div className="col-span-1 text-lg font-sans font-bold px-1">
          {this.props.quantite}
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2">
            <button
              className={
                "row-span-1 btn flex justify-center hover:text-secondary hover:bg-third hover:border rounded-lg focus:outline-none" +
                (this.props.inCart || this.props.produit.stockProduit === 0
                  ? " hidden"
                  : "")
              }
              onClick={this.props.incrementQuantite}
            >
              <BsChevronCompactUp />
            </button>
            <button
              className={
                "row-span-1 btn flex justify-center hover:text-secondary hover:bg-third hover:border rounded-lg focus:outline-none" +
                (this.props.inCart || this.props.produit.stockProduit === 0
                  ? " hidden"
                  : "")
              }
              onClick={this.props.decrementQuantite}
            >
              <BsChevronCompactDown />
            </button>
          </div>
        </div>
      </div>
    );
  };

  addToCart = () => {
    return (
      <div
        className={
          "w-full flex justify-center" +
          (this.props.produit.stockProduit === 0 ? " opacity-25" : "")
        }
      >
        <button
          className={
            this.props.inCart
              ? "btn flex justify-center items-center font-bold italic text-white w-64 hover:bg-white border rounded-lg focus:outline-none hover:text-third bg-third border-third"
              : "btn flex justify-center items-center font-bold italic text-white w-64 hover:bg-white border rounded-lg focus:outline-none hover:text-primary bg-primary border-primary"
          }
          disabled={this.props.produit.stockProduit === 0 ? "disabled" : ""}
          onClick={() => {
            let inCart = this.props.inCart;
            inCart = !inCart;
            this.props.handleChangeInCart(inCart);
          }}
        >
          <RiShoppingBasket2Line className="h-5 w-5" />
          <span className="ml-2">
            {this.props.inCart ? "Retirer du panier" : "Ajouter au panier"}
          </span>
        </button>
      </div>
    );
  };

  // favorite = () => {
  //   if (this.props.produit.favorite) {
  //     return (
  //       <div className="text-third flex font-bold">
  //         <RiHeartFill className="w-6 h-6 mr-2" />
  //         Retirer du favorites
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="text-primary flex font-bold">
  //       <RiHeartAddLine className="w-6 h-6 mr-2" />
  //       Ajouter au favorites
  //     </div>
  //   );
  // };

  showPromo = () => {
    if (this.props.produit.promotion !== null) {
      return (
        <div className="pt-5">
          <div className="w-20 h-5 bg-primary text-white text-sm rounded">
            {"- " + this.props.produit.promotion.valeurPromo + " %"}
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="p-10 lg:p-2">
        <div className="lg:text-left text-center text-third">
          <div className="text-2xl font-sans capitalize italic font-bold">
            {this.props.produit.titreProduit}
          </div>
          {/* <div className="text-sm">{this.props.produit.taille}</div>
          <hr /> */}
          <div className="text-md font-bold">{this.props.produit.marque}</div>
          <hr />

          <div className="text-md font-bold">
            Catégorie : {this.props.produit.categorie.libelleCategorie}
          </div>
          <hr />

          <div className="w-full text-sm flex font-bold justify-end">
            <div className="w-full text-right">
              {"Référence : " + this.props.produit.reference}
            </div>
          </div>
        </div>

        {this.showPromo()}

        <div className="pt-5 lg:text-left">{this.price()}</div>

        <div className="pt-5 lg:text-left">{this.enStock()}</div>

        <div className="flex lg:justify-end mt-5 justify-center">
          {this.modifQuantite()}
          {this.addToCart()}
        </div>

        {/* <div className="pt-5 grid grid-cols-2 lg:text-left">
          <div className="col-span-1">
            <button
              className="btn focus:outline-none"
              onClick={() => {
                let produit = this.props.produit;
                produit.favorite = !produit.favorite;
                this.props.handleChangeProduit(produit);
              }}
            >
              {this.favorite()}
            </button>
          </div>
          <div className="col-span-1 flex italic justify-end items-center">
            Partager :
            <a href="www.facebook.com" target="_blank">
              <FaFacebookF className="w-5 h-5 mx-1" />
            </a>
            <a href="www.facebook.com" target="_blank">
              <FaInstagram className="w-6 h-6 mx-1" />
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default SellingDetails;
