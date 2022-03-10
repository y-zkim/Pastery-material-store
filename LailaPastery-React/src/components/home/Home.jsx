import React, { Component } from "react";
import UpperHomeBanner from "./UpperHomeBanner";
import Indesponsable from "./Indesponsable";
import TopVentes from "../TopVentes";
import TopPromotions from "../TopPromotions";
import forkCake from "../../assets/fork-cake.jpg";
import cupCake from "../../assets/cupCake.jpg";
import lollipop from "../../assets/lollipop.jpg";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";

class Home extends Component {
  state = {
    topPromotions: [],
    topVentes: [],
    isTopPromosionsLoaded: false,
    isTopVentesLoaded: false,
  };

  uploadCategories = () => {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.categories);
        this.setState({
          categories: result.categories,
          isCategoriesLoaded: true,
        });
      });
  };

  uploadProduits = () => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((result) => {
        let topPromotions = result.produits.filter(
          (produit) => produit.promotion != null
        );
        topPromotions = topPromotions.filter(
          (produit) => produit.promotion.valeurPromo >= 40
        );
        this.setState({
          topPromotions: topPromotions,
          isTopPromosionsLoaded: true,
        });
      });
  };

  uploadCommandes = () => {
    fetch("http://127.0.0.1:8000/api/basket")
      .then((res) => res.json())
      .then((result) => {
        console.log("result = ");
        console.log(result);
        let commandes = result.commandes.filter(
          (commande) => commande.etat != "in_basket"
        );

        let produits = [];
        for (let i = 0; i < commandes.length; i++) {
          for (let j = 0; j < commandes[i].produits.length; j++) {
            produits.push(commandes[i].produits[j]);
          }
        }

        console.log("produits = ");
        console.log(produits);

        let maps = [];

        for (let i = 0; i < produits.length; i++) {
          let map = {};
          let count = produits.filter(
            (produit) => produit.id === produits[i].id
          ).length;
          map["id"] = produits[i].id;
          map["count"] = count;
          let exist = false;
          for (let j = 0; j < maps.length; j++) {
            if (maps[j].id === map.id) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            maps.push(map);
          }
        }

        console.log("maps = ");
        console.log(maps);

        maps.sort((a, b) => b.count - a.count);

        console.log("maps = ");
        console.log(maps);

        let topVentes = [];
        for (let i = 0; i < maps.length && i < 6; i++) {
          topVentes.push(
            produits.filter((produit) => produit.id === maps[i].id)[0]
          );
        }

        console.log("topVentes = ");
        console.log(topVentes);

        this.setState({
          topVentes: topVentes,
          isTopVentesLoaded: true,
        });
      });
  };

  componentWillMount() {
    this.uploadCategories();
    this.uploadProduits();
    this.uploadCommandes();
  }

  showTopPromosions = () => {
    if (this.state.isTopPromosionsLoaded) {
      return (
        <TopPromotions
          produits={this.state.topPromotions}
          addProduitToCommande={this.props.addProduitToCommande}
          removeProduitFromCommande={this.props.removeProduitFromCommande}
          produitsCommande={this.props.commande.produits}
        />
      );
    } else {
      return (
        <div className="flex justify-center w-full">
          <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
        </div>
      );
    }
  };

  showTopVontes = () => {
    if (this.state.isTopVentesLoaded) {
      return (
        <TopVentes
          produits={this.state.topVentes}
          addProduitToCommande={this.props.addProduitToCommande}
          removeProduitFromCommande={this.props.removeProduitFromCommande}
          produitsCommande={this.props.commande.produits}
        />
      );
    } else {
      return (
        <div className="flex justify-center w-full">
          <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <UpperHomeBanner />
        <Indesponsable />
        <div className="w-full">
          <img src={forkCake} className="w-full object-cover" alt="" />
        </div>
        <div className="w-auto xl:px-32 md:px-20 mx-auto">
          {this.showTopVontes()}
        </div>

        <div className="w-full">
          <img src={cupCake} className="w-full object-cover" alt="" />
        </div>
        <div className="w-auto xl:px-32 md:px-20 mx-auto">
          {this.showTopPromosions()}
        </div>
        <div className="w-full">
          <img src={lollipop} className="w-full object-cover" alt="" />
        </div>
      </div>
    );
  }
}

export default Home;
