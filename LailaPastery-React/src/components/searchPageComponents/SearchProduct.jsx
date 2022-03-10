import React, { Component } from "react";
import ProductsFound from "./ProductsFound";
import NoProductFound from "./NoProductFound";
// import BlogsFound from "./BlogsFound";
import TopVentes from "../TopVentes";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";

class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      query: "",
      produits: [],
      produitsFiltre: [],
      themes: [],
      prixProduitRanges: [0, 0],
      selectedTheme: "Tous",
    };
  }

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let urlToSearch;
    let justPromo = false;
    if (urlParams.has("query")) {
      const query = urlParams.get("query");
      urlToSearch = "search?query=" + query;
    } else if (urlParams.has("cat")) {
      const query = urlParams.get("cat");
      urlToSearch = "categories/" + query;
    } else if (urlParams.has("promo")) {
      urlToSearch = "search?query=";
      justPromo = true;
    } else {
      window.location.href = "/";
    }

    Axios.get(urlToSearch)
      .then((message) => {
        let produits = message.data.produits;
        if (justPromo) {
          produits = produits.filter((produit) => produit.promotion !== null);
        }
        let En_Stock = 0;
        let promotions = 0;
        produits.map((produit) => {
          if (produit.stockProduit !== 0) {
            En_Stock++;
          }
          if (produit.promotion !== null) {
            promotions++;
          }
        });

        let themes = [
          ...new Set(
            produits.map((produit) => {
              if (
                produit.theme !== null &&
                produit.theme !== "" &&
                produit.theme !== undefined
              )
                return produit.theme;
            })
          ),
        ];
        themes = ["Tous", ...themes.filter((marque) => marque !== null)];

        let produitsFiltre = produits;

        const prixProduits = [
          ...new Set(produits.map((produit) => produit.prixProduit)),
        ];
        let prixProduitRanges = [0, 0];
        prixProduitRanges[0] = Math.min(...prixProduits);
        prixProduitRanges[1] = Math.max(...prixProduits);

        this.setState({
          isLoaded: true,
          produits: produits,
          query: message.data.query,
          produitsFiltre,
          En_Stock,
          promotions,
          themes,
          prixProduitRanges,
        });
      })
      .catch((errors) => {
        window.location.href = "/";
      });
  }

  handleChangeProduit = (produit) => {
    const produits = [...this.state.produits];
    const index = produits.indexOf(produit);
    if (index !== null) {
      produits[index] = { ...produit };
      this.setState({ produits });
    }
  };

  affinerRecherche = () => {
    let produitsFiltre = this.state.produits;
    this.setState({ produitsFiltre: produitsFiltre, selectedTheme: "Tous" });
  }

  selectTheme = (theme) => {
    let produitsFiltre = this.state.produits;
    if (theme !== "Tous") {
      produitsFiltre = produitsFiltre.filter(
        (produit) => produit.theme === theme
      );
    }
    this.setState({ produitsFiltre: produitsFiltre, selectedTheme: theme });
  };

  searchDone = () => {
    if (this.state.isLoaded) {
      if (this.state.produits.length === 0) {
        return <NoProductFound />;
      }
      return (
        <ProductsFound
          produits={this.state.produitsFiltre}
          changeProduit={this.handleChangeProduit}
          En_Stock={this.state.En_Stock}
          promotions={this.state.promotions}
          themes={this.state.themes}
          selectedTheme={this.state.selectedTheme}
          selectTheme={this.selectTheme}
          affinerRecherche={this.affinerRecherche}
          prixProduitRanges={this.state.prixProduitRanges}
          produitsCommande={this.props.commande.produits}
          addProduitToCommande={this.props.addProduitToCommande}
          removeProduitFromCommande={this.props.removeProduitFromCommande}
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
        <div className="w-auto xl:px-32 md:px-20 mx-auto">
          <h1 className="text-4xl font-serif font-bold italic m-10 text-primary text-center">
            {this.state.query}
          </h1>

          {this.searchDone()}

          {/* <BlogsFound /> */}

          {/* <TopVentes /> */}
        </div>
      </div>
    );
  }
}

export default SearchProduct;
