import React, { Component } from "react";
import ProduitLoaded from "./ProduitLoaded";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";

class ProduitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produit: null,
      isLoaded: false,
    };
  }

  componentWillMount() {
    let idProd = window.location.href.replace("http://localhost:3000/", "");
    idProd = idProd.replace("products/", "");
    idProd = idProd.replace("produit/", "");
    idProd = idProd.replace("Produit/", "");
    if (idProd === "") {
      window.location.href = "/";
    } else {
      Axios.get("products/" + idProd + "/edit")
        .then((message) =>
          this.setState({ isLoaded: true, produit: message.data[0] })
        )
        .catch((errors) => {
          window.location.href = "/";
        });
    }
  }

  handleProduitLoaded = () => {
    if (this.state.isLoaded) {
      return (
        <ProduitLoaded
          commande={this.props.commande}
          produit={this.state.produit}
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
    return this.handleProduitLoaded();
  }
}

export default ProduitPage;
