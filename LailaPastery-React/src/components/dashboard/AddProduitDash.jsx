import React, { Component } from "react";
import { TiPlus } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import DropdownSelect from "react-dropdown";
import { Dropdown } from "semantic-ui-react";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";
import "semantic-ui-css/semantic.min.css";

class AddProduitDash extends Component {
  state = {
    themes: this.props.themes,
    principal_img: "",
    images: [],
    newProduit: {
      reference: "",
      titre: "",
      description: "",
      stock: null,
      marque: null,
      theme: null,
      is_indesponsable: false,
      prix: null,
      promotion_id: null,
      categorie_id: null,
      principal_img: null,
      images: [],
    },
    promotions: [],
    categories: [],
    showPromoDropdown: false,
  };

  handleAddition = (e, { value }) => {
    let newProduit = this.state.newProduit;
    newProduit.theme = value;
    this.setState((prevState) => ({
      newProduit: newProduit,
      themes: [{ text: value, value }, ...prevState.themes],
    }));
  };

  handleChange = (e, { value }) => {
    let newProduit = this.state.newProduit;
    newProduit.theme = value;
    this.setState({ newProduit: newProduit, currentValue: value });
  };

  componentWillMount() {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) => {
        let promotions = [...result.promotions];
        let categories = [...result.categories];
        this.setState({
          promotions: promotions,
          categories: categories,
          isLoaded: true,
        });
      });
  }

  handleShowPromoDropdown = () => {
    if (this.state.showPromoDropdown) {
      return (
        <DropdownSelect
          options={this.state.promotions.map((promotion) => {
            if (promotion === null) return "-";
            return promotion.id + " - " + promotion.valeurPromo + "%";
          })}
          onChange={(e) => {
            let newProduit = this.state.newProduit;
            if (e.value === "-") {
              newProduit.promotion = null;
              newProduit.promotion_id = null;
            } else {
              newProduit.promotion = this.state.promotions.filter(
                (promotion) =>
                  e.value == promotion.id + " - " + promotion.valeurPromo + "%"
              )[0];
              newProduit.promotion_id = newProduit.promotion.id;
            }
            this.setState({ newProduit });
          }}
          value="Choisir"
        />
      );
    }
  };

  editPic = (e) => {
    let principal_img = URL.createObjectURL(e.target.files[0]);

    let newProduit = this.state.newProduit;
    newProduit.principal_img = e.target.files[0];
    this.setState({
      newProduit,
      principal_img,
    });
  };

  editOtherPics = (e) => {
    let images = this.state.images;
    images.push(URL.createObjectURL(e.target.files[0]));

    let newProduit = this.state.newProduit;
    newProduit.images.push(e.target.files[0]);
    this.setState({
      newProduit,
      images,
    });
  };

  initializeProduit = () => {
    let newProduit = {
      reference: "",
      titre: "",
      description: "",
      stock: null,
      marque: null,
      theme: null,
      is_indesponsable: false,
      prix: null,
      promotion_id: null,
      categorie_id: null,
      principal_img: "",
      images: [],
    };
    this.setState({ newProduit: newProduit });
  };

  is_indesponsableRadios = () => {
    if (!this.state.newProduit.is_indesponsable) {
      return (
        <td>
          <label className="mx-2">
            <input
              checked
              type="radio"
              name="is_indesponsable"
              className="mx-2"
              onChange={() => {
                let newProduit = this.state.newProduit;
                newProduit.is_indesponsable = false;
                this.setState({ newProduit });
              }}
            />{" "}
            Non
          </label>

          <label className="mx-2">
            <input
              type="radio"
              name="is_indesponsable"
              className="mx-2"
              onChange={() => {
                let newProduit = this.state.newProduit;
                newProduit.is_indesponsable = true;
                this.setState({ newProduit });
              }}
            />{" "}
            Oui
          </label>
        </td>
      );
    } else {
      return (
        <td>
          <label className="mx-2">
            <input
              type="radio"
              name="is_indesponsable"
              className="mx-2"
              onChange={() => {
                let newProduit = this.state.newProduit;
                newProduit.is_indesponsable = false;
                this.setState({ newProduit });
              }}
            />{" "}
            Non
          </label>

          <label className="mx-2">
            <input
              type="radio"
              name="is_indesponsable"
              checked
              className="mx-2"
              onChange={() => {
                let newProduit = this.state.newProduit;
                newProduit.is_indesponsable = true;
                this.setState({ newProduit });
              }}
            />{" "}
            Oui
          </label>
        </td>
      );
    }
  };

  render() {
    const { currentValue } = this.state;
    console.log(this.state.newProduit);
    return (
      <Popup
        trigger={
          <button className="btn rounded-lg py-1 px-3 flex items-center bg-secondary font-bold text-primary border focus:outline-none hover:text-secondary hover:bg-primary hover:border-secondary">
            <TiPlus className="h-5 w-5" />
            Ajouter Produit
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
                  this.initializeProduit();
                  close();
                }}
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-third"> Détails du produit : </div>
            <div className="w-full p-5">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Référence</td>
                    <td>
                      <input
                        id="reference"
                        type="text"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let newProduit = this.state.newProduit;
                          newProduit.reference = e.target.value;
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Titre</td>
                    <td>
                      <input
                        id="titreProduit"
                        type="text"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let newProduit = this.state.newProduit;
                          newProduit.titre = e.target.value;
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Descreption</td>
                    <td>
                      <textarea
                        id="descreptionProduit"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let newProduit = this.state.newProduit;
                          newProduit.description = e.target.value;
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full h-14 mt-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Stock</td>
                    <td>
                      <input
                        id="stockProduit"
                        type="text"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let newProduit = this.state.newProduit;
                          newProduit.stock = parseInt(e.target.value);
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Marque</td>
                    <td>
                      <input
                        id="marqueProduit"
                        type="text"
                        onChange={(e) => {
                          let newProduit = this.state.newProduit;
                          newProduit.marque = e.target.value;
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Théme</td>
                    <td>
                      <Dropdown
                        options={this.state.themes}
                        placeholder="Choose Language"
                        search
                        selection
                        fluid
                        allowAdditions
                        value={currentValue}
                        onAddItem={this.handleAddition}
                        onChange={this.handleChange}
                      />
                      {/* <input
                        id="theme"
                        type="text"
                        onChange={(e) => {
                          let newProduit = this.state.newProduit;
                          newProduit.theme = e.target.value;
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      /> */}
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Prix</td>
                    <td>
                      <input
                        id="prixProduit"
                        type="text"
                        onChange={(e) => {
                          let newProduit = this.state.newProduit;
                          newProduit.prix = parseFloat(e.target.value);
                          this.setState({ newProduit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>

                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Indéspensable ?</td>
                    {this.is_indesponsableRadios()}
                  </tr>

                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Promotion</td>
                    <td>
                      <div className="flex w-full grid-cols-2">
                        <button
                          className="btn focus:outline-none text-xs p-1 m-1 bg-secondary border border-primary rounded"
                          onClick={(e) => {
                            if (this.state.showPromoDropdown) {
                              e.target.innerHTML = "Ajouter";
                              let newProduit = this.state.newProduit;
                              newProduit.promotion = null;
                              newProduit.promotion_id = null;
                              this.setState({
                                newProduit: newProduit,
                                showPromoDropdown: false,
                              });
                            } else {
                              e.target.innerHTML = "Retirer";
                              this.setState({
                                showPromoDropdown: true,
                              });
                            }
                          }}
                        >
                          Ajouter
                        </button>
                        <div className="w-full">
                          {this.handleShowPromoDropdown()}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Categorie</td>
                    <td>
                      <DropdownSelect
                        options={this.state.categories.map((categorie) => {
                          if (categorie === null) return "-";
                          return (
                            categorie.id + " - " + categorie.libelleCategorie
                          );
                        })}
                        onChange={(e) => {
                          let newProduit = this.state.newProduit;
                          newProduit.categorie =
                            e.value == "-"
                              ? null
                              : this.state.categories.filter(
                                  (categorie) =>
                                    e.value ==
                                    categorie.id +
                                      " - " +
                                      categorie.libelleCategorie
                                )[0];
                          newProduit.categorie_id = newProduit.categorie.id;
                          this.setState({ newProduit });
                        }}
                        placeholder="Choisir"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Image Principale</td>
                    <td>
                      <div className="flex justify-center space-x-10">
                        <img
                          src={this.state.principal_img}
                          className="h-16"
                          alt=""
                        />

                        <div className="flex justify-center items-center">
                          <button
                            className="btn rounded-lg px-3 bg-green-400 text-white border hover:text-green-400 hover:bg-white hover:border-green-400 focus:outline-none"
                            onClick={(e) => {
                              this.inputFile.click();
                              e.target.hidden = true;
                            }}
                          >
                            Ajouter
                            <input
                              ref={(ref) => (this.inputFile = ref)}
                              type="file"
                              defaultValue=""
                              accept="image/*"
                              required
                              hidden={true}
                              onChange={(e) => this.editPic(e)}
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Autres Images</td>
                    <td>
                      <div className="flex justify-center space-x-10">
                        <div className="grid md:grid-cols-1 lg:grid-cols-4">
                          {this.state.images.map((image) => {
                            return (
                              <img src={image} className="h-16 mr-1" alt="" />
                            );
                          })}
                        </div>

                        <div className="flex justify-center items-center">
                          <button
                            className="btn rounded-lg px-3 bg-green-400 text-white border hover:text-green-400 hover:bg-white hover:border-green-400 focus:outline-none"
                            onClick={(e) => {
                              this.inputFile2.click();
                              if (this.state.newProduit.images.length >= 3) {
                                e.target.hidden = true;
                              }
                            }}
                          >
                            Ajouter
                            <input
                              ref={(ref) => (this.inputFile2 = ref)}
                              type="file"
                              defaultValue=""
                              accept="image/*"
                              required
                              hidden={true}
                              onChange={(e) => this.editOtherPics(e)}
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="actions">
              <button
                className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
                onClick={() => {
                  this.props.ajouterProduit(this.state.newProduit);
                  this.initializeProduit();
                  close();
                }}
              >
                Ajouter
              </button>

              <button
                className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                onClick={() => {
                  console.log("modal closed ");
                  this.initializeProduit();
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
  }
}

export default AddProduitDash;
