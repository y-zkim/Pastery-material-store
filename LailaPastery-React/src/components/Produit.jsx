import React, { Component } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  RiHeartAddLine,
  RiShoppingBasket2Fill,
  RiShoppingBasket2Line,
  RiHeartFill,
} from "react-icons/ri";
import { FaStar, FaRegStar, FaRegTimesCircle } from "react-icons/fa";
import Loader from "react-loader-spinner";

class Produit extends Component {
  state = {
    isLoaded: false,
    produit: this.props.produit,
  };

  componentWillMount() {
    if (this.props.produit !== null) {
      this.setState({ isLoaded: true });
    }
  }

  showTitle = () => {
    let string = this.props.produit.titreProduit;
    if (string.length > 40) {
      string = string.substring(0, 30) + "...";
    }
    return string;
  };

  loadDone = () => {
    if (this.state.isLoaded) {
      return (
        <div
          id="produitCart"
          className={
            "border-2 rounded-xl m-3" +
            (this.props.inCart
              ? " bg-third border-third"
              : " bg-primary border-primary")
          }
        >
          <div className="bg-white rounded-xl px-3 py-1 shadow-xl h-60">
            <div
              className={
                "flex" + (this.props.inCart ? " text-third" : " text-primary")
              }
            >
              {this.EnStock()}
              <div className="w-full"></div>
              {this.showPromo()}
              {/* <button
                onClick={() => {
                  let produit = this.state.produit;
                  produit.favorite = !this.state.produit.favorite;
                  this.props.changeProduit(produit);
                }}
                className="focus:outline-none"
              >
                {this.favorite()}
              </button> */}
            </div>

            <div className="flex justify-center">
              <a
                className="w-24 h-24"
                href={"/Produit/" + this.props.produit.id}
              >
                <img
                  className={
                    "rounded-lg border-2 rounded" +
                    (this.props.inCart ? " border-third" : " border-primary")
                  }
                  src={
                    "http://localhost:8000/" +
                    this.props.produit.images[0].image_content
                  }
                  alt=""
                />
              </a>
            </div>

            <div className="h-12 mt-2">
              <h6 className="font-serif text-md font-bold italic text-third text-center">
                {this.showTitle()}
              </h6>
            </div>

            {/* <div className="flex justify-center text-yellow">
            {this.rate(this.props.produit.rate)}
          </div> */}

            <div className="mt-2 text-center font-mono">{this.price()}</div>
          </div>

          <div className="flex text-xs my-1 justify-center items-center text-white font-mono italic">
            {this.cart()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center w-full">
          <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
        </div>
      );
    }
  };

  EnStock = () => {
    if (this.state.enStock != 0) {
      return <IoMdCheckmarkCircleOutline className="w-7 h-7" />;
    }
    return <FaRegTimesCircle className="w-7 h-7" />;
  };

  // favorite = () => {
  //   if (this.state.produit.favorite) {
  //     return <RiHeartFill className="w-6 h-6" />;
  //   }
  //   return <RiHeartAddLine className="w-6 h-6" />;
  // };

  // rate = (nbrStars) => {
  //   let table = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (i < nbrStars) {
  //       table.push(<FaStar />);
  //     } else {
  //       table.push(<FaRegStar />);
  //     }
  //   }
  //   return table;
  // };

  showPromo = () => {
    if (this.props.produit.promotion !== null) {
      return (
        <div className="my-auto flex items-center">
          <div className={"w-16 h-full text-white text-xs rounded" + (this.props.inCart ? " bg-third" : " bg-primary")}>
            {"- " + this.props.produit.promotion.valeurPromo + " %"}
          </div>
        </div>
      );
    }
  };

  price = () => {
    let table = [];
    let produit = this.props.produit;
    if (this.props.produit.promotion !== null) {
      table.push(
        <span
          className={
            "text-xl font-bold" +
            (this.props.inCart ? " text-third" : " text-primary")
          }
        >
          <sup className="text-xs text-gray-700">
            <strike>{Math.floor(produit.prixProduit)}</strike>
            <sup>
              ,
              {(
                produit.prixProduit -
                Math.floor(produit.prixProduit) * 1.0
              ).toFixed(2) * 100}
            </sup>
            <sub>{"DH"}</sub>
          </sup>
          &nbsp;
          {Math.floor(
            produit.prixProduit -
              (produit.prixProduit * produit.promotion.valeurPromo) / 100
          )}
          <sup>
            ,
            {(
              produit.prixProduit -
              (produit.prixProduit * produit.promotion.valeurPromo) / 100 -
              Math.floor(
                produit.prixProduit -
                  (produit.prixProduit * produit.promotion.valeurPromo) / 100
              ) *
                1.0
            ).toFixed(2) * 100}
          </sup>
          <sub>{"DH"}</sub>
        </span>
      );
    } else {
      table.push(
        <span
          className={
            "text-xl font-bold" +
            (this.props.inCart ? " text-third" : " text-primary")
          }
        >
          {Math.floor(produit.prixProduit)}
          <sup>
            ,
            {(
              produit.prixProduit -
              Math.floor(produit.prixProduit) * 1.0
            ).toFixed(2) * 100}
          </sup>
          <sub>{"DH"}</sub>
        </span>
      );
    }

    return table;
  };

  cart = () => {
    let table = [];
    if (this.props.inCart) {
      table.push(
        <button
          onClick={() =>
            this.props.removeProduitFromCommande(this.props.produit.id)
          }
          className="flex justify-center items-center focus:outline-none"
        >
          <RiShoppingBasket2Fill className="h-5 w-5" />
          <span className="ml-2">Retirer du panier</span>
        </button>
      );
    } else {
      table.push(
        <button
          onClick={() =>
            this.props.addProduitToCommande(this.props.produit.id, 1)
          }
          className="flex justify-center items-center focus:outline-none"
        >
          <RiShoppingBasket2Line className="h-5 w-5" />
          <span className="ml-2">Ajouter au panier</span>
        </button>
      );
    }
    return table;
  };

  render() {
    return this.loadDone();
  }
}

export default Produit;
