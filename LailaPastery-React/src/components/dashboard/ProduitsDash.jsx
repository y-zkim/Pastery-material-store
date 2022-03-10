import React, { Component } from "react";
import ProduitDash from "./ProduitDash";
import { FaSearch } from "react-icons/fa";
import AddProduitDash from "./AddProduitDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProduitsDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produits: [],
      produitsFiltre: [],
      themes: [],
      nbrToShow: 5,
      isLoaded: false,
    };
  }

  uploadProduits = () => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((result) => {
        let themes = [];
        result.produits.filter((produit) => {
          if (produit.theme != null && produit.theme != "")
            themes.push({ text: produit.theme, value: produit.theme });
        });
        this.setState({
          produits: result.produits,
          themes: themes,
          isLoaded: true,
          produitsFiltre: result.produits.filter((produit) => {
            if (result.produits.indexOf(produit) < this.state.nbrToShow) {
              return produit;
            }
          }),
        });
      });
  };

  componentWillMount() {
    this.uploadProduits();
  }

  handleDeleteProduit = (idProduit) => {
    Axios.delete("products/" + idProduit)
      .then((response) => {
        toast.success("Le produit est supprimé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadProduits();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas supprimer ce produit", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  handleChangeProduit = (produit) => {
    let fData = new FormData();
    fData.append("titre", produit.titreProduit);
    fData.append("description", produit.descProduit);
    fData.append("stock", produit.stockProduit);
    fData.append("marque", produit.marque);
    fData.append("theme", produit.theme);
    fData.append("is_indesponsable", produit.is_indesponsable);
    fData.append("prix", produit.prixProduit);
    fData.append(
      "promotion_id",
      produit.promotion == null ? null : produit.promotion.id
    );
    fData.append(
      "categorie_id",
      produit.categorie == null ? null : produit.categorie.id
    );
    if (produit.principal_img != "") {
      fData.append("principal_img", produit.principal_img);
    }
    if (produit.images != []) {
      for (let i = 0; i < produit.images.length; i++) {
        fData.append("images[]", produit.images[i]);
      }
    }
    Axios.post("products/" + produit.id + "?_method=PUT", fData)
      .then((response) => {
        toast.success("Le produit est changé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadProduits();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas changer ce produit", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  handleAjouterProduit = (produit) => {
    let fData = new FormData();
    fData.append("reference", produit.reference);
    fData.append("titre", produit.titre);
    fData.append("description", produit.description);
    fData.append("stock", produit.stock);
    fData.append("theme", produit.theme);
    if (produit.is_indesponsable) {
      fData.append("is_indesponsable", true);
    } else {
      fData.append("is_indesponsable", false);
    }
    fData.append("marque", produit.marque);
    fData.append("prix", produit.prix);
    fData.append("promotion_id", produit.promotion_id);
    fData.append("categorie_id", produit.categorie_id);
    fData.append("principal_img", produit.principal_img);
    for (let i = 0; i < produit.images.length; i++) {
      fData.append("images[]", produit.images[i]);
    }

    Axios.post("products", fData)
      .then((response) => {
        toast.success("Le produit a ajouté", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadProduits();
      })
      .catch((errors) => {
        toast.error("Le produit n'a pas ajouté", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  incrementNbrToShow = () => {
    let nbrToShow = this.state.nbrToShow * 2;

    let produitsFiltre = this.state.produits.filter((produit) => {
      if (this.state.produits.indexOf(produit) < nbrToShow) {
        return produit;
      }
    });
    this.setState({ produitsFiltre, nbrToShow });
  };

  handleShowMore = () => {
    if (this.state.nbrToShow >= this.state.produits.length) {
      return false;
    } else {
      return true;
    }
  };

  tableBody = (isLoaded) => {
    if (isLoaded) {
      return (
        <tbody>
          {this.state.produitsFiltre.map((produit) => {
            return (
              <ProduitDash
                key={produit.id}
                produit={produit}
                themes={this.state.themes}
                changeProduit={this.handleChangeProduit}
                deleteProduit={this.handleDeleteProduit}
              />
            );
          })}
        </tbody>
      );
    } else {
      return (
        <div className="flex justify-center w-full">
          <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
        </div>
      );
    }
  };

  buttonToShow = () => {
    if (this.handleShowMore()) {
      return (
        <button
          className="w-full bg-primary text-white border hover:text-primary hover:bg-white hover:border-primary font-bold rounded-lg  text-center focus:outline-none"
          onClick={() => this.incrementNbrToShow()}
        >
          Voir Plus
        </button>
      );
    }
  };

  handleSearchProduit = (key) => {
    if (key === "") {
      let produitsFiltre = this.state.produits.filter((produit) => {
        if (this.state.produits.indexOf(produit) < this.state.nbrToShow) {
          return produit;
        }
      });
      this.setState({ produitsFiltre });
    } else {
      let produitsFiltre = this.state.produits.filter((produit) => {
        if (produit.titreProduit.includes(key)) {
          return produit;
        }
      });
      this.setState({ produitsFiltre });
    }
  };

  newProduitBtn = () => {
    if (this.state.isLoaded) {
      return (
        <AddProduitDash
          ajouterProduit={this.handleAjouterProduit}
          themes={this.state.themes}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <div className="m-5 rounded-xl border bg-white shadow-2xl">
          <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
            <div className="">Produits</div>
            <div className="w-full flex justify-end space-x-4">
              <div className="bg-white flex items-center rounded-lg border w-64">
                <input
                  className="w-full px-2 text-third leading-tight font-medium focus:outline-none"
                  id="search"
                  type="text"
                  placeholder="Search"
                  onChange={(event) =>
                    this.handleSearchProduit(event.target.value)
                  }
                />
                <div className="text-third rounded-tr-lg rounded-br-lg p-1 flex items-center justify-center border border-white">
                  <FaSearch className="h-5 w-5" />
                </div>
              </div>
              {this.newProduitBtn()}
            </div>
          </div>

          <div className="p-10 w-full">
            <table width="100%">
              <thead className="border-b-2">
                <tr>
                  <th>Référence</th>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>Promotion</th>
                  <th>Quantité</th>
                  <th>Détails</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              {this.tableBody(this.state.isLoaded)}
            </table>
            {this.buttonToShow()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProduitsDash;
