import React, { Component } from "react";
import Produits from "../Produits";
import SearchBar from "./SearchBar";
import Loader from "react-loader-spinner";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

import "react-responsive-carousel/lib/styles/carousel.min.css";
var Carousel = require("react-responsive-carousel").Carousel;

export class ProductsFound extends Component {
  state = {
    produits: this.props.produits,
    isLoaded: false,
    filters: [],
    searchBarView: "hidden"
  };

  componentWillMount() {
    if (this.state.produits !== null) {
      this.setState({ isLoaded: true });
    }
  }

  nePasManquer = (filter) => {
    let filters = this.state.filters;
    let produits = this.props.produits;

    if(filter === ""){
      filters = []
    } else {
      if(filters.includes(filter)) {
        filters.pop(filter);
      } else {
        filters.push(filter);
      }

      if(filters.includes("En Stock")) {
        produits = produits.filter((produit) => produit.stockProduit != null)
      }
      if(filters.includes("Promotions")) {
        produits = produits.filter((produit) => produit.promotion != null)
      }
    }
    this.setState({produits, filters})
  }

  loadProductsToCarousel = () => {
    const countProducts = 16;
    const count = Math.ceil((this.state.produits.length * 1.0) / countProducts);
    let table = [];
    for (let i = 0; i < count; i++) {
      let products = [];
      for (
        let j = i * countProducts;
        j < i * countProducts + countProducts && j < this.state.produits.length;
        j++
      ) {
        products.push(this.state.produits[j]);
      }
      table.push(
        <Produits
          produits={products}
          changeProduit={this.props.changeProduit}
          produitsCommande={this.props.produitsCommande}
          addProduitToCommande={this.props.addProduitToCommande}
          removeProduitFromCommande={this.props.removeProduitFromCommande}
        />
      );
    }
    return table;
  };

  loadDone = () => {
    if (this.state.isLoaded) {
      return (
        <div className="grid w-full md:grid-cols-4 my-3">
          <button onClick={() => {
            if(this.state.searchBarView === "hidden") {
              this.setState({searchBarView: "block"})
            } else {
              this.setState({searchBarView: "hidden"})
            }
          }}
          className="block my-2 md:hidden bg-secondary border-2 border-primary rounded-lg text-center font-sans text-sm focus:outline-none w-full">
            <div className="flex justify-center py-1 font-bold items-center">
              {this.state.searchBarView === "hidden" ? <GiHamburgerMenu className="w-7" /> : <ImCross className="w-7" />}
              <span>Filter</span>
            </div>
          </button>
          <div className={this.state.searchBarView + " md:block"}>
            <SearchBar
              produits={this.state.produits}
              En_Stock={this.props.En_Stock}
              promotions={this.props.promotions}
              themes={this.props.themes}
              filters={this.state.filters}
              nePasManquer={this.nePasManquer}
              selectTheme={this.props.selectTheme}
              affinerRecherche={this.props.affinerRecherche}
              selectedTheme={this.props.selectedTheme}
              prixProduitRanges={this.props.prixProduitRanges}
            />
          </div>
          
          <div className="md:col-span-3 pl-4">
            <div className="mt-2">
              <Carousel
                showIndicators={true}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                useKeyboardArrows
                className=" bg-gray-300 rounded-xl"
              >
                {this.loadProductsToCarousel().map((child) => {
                  return <div className="pb-10">{child}</div>;
                })}
              </Carousel>
            </div>
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

  render() {
    return (
      <div className="mx-2">
        <div className="grid w-full grid-cols-6 items-center">
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
          <div className="col-span-2">
            <h5 className="font-serif font-bold italic text-primary text-center">
              Produits
            </h5>
          </div>
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
        </div>

        {this.loadDone()}
      </div>
    );
  }
}

export default ProductsFound;
