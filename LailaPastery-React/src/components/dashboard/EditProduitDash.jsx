import React, { Component } from "react";
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class EditProduitDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      principal_img: "",
      images: [],
      produit: this.props.produit,
      promotions: [],
      categories: [],
      showPromoDropdown: this.props.produit.promotion !== null,
    };
  }

  componentWillMount() {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) => {
        let images = [];
        this.props.produit.images.map((image) => {
          if (image.is_principal != 1)
            images.push("http://localhost:8000/" + image.image_content);
        });

        let principal_img =
          "http://localhost:8000/" +
          this.props.produit.images.filter(
            (image) => image.is_principal == 1
          )[0].image_content;

        let produit = this.props.produit;
        produit.images = [];
        produit.principal_img = "";

        let promotions = [...result.promotions];
        let categories = [...result.categories];
        this.setState({
          images: images,
          principal_img: principal_img,
          promotions: promotions,
          categories: categories,
          isLoaded: true,
        });
      });
  }

  defaultPromotion = () => {
    let produit = this.props.produit;
    if (produit.promotion === null) {
      return "-";
    } else {
      return produit.promotion.id + " - " + produit.promotion.valeurPromo + "%";
    }
  };

  defaultCategorie = () => {
    let produit = this.props.produit;
    if (produit.categorie != null) {
      return produit.categorie.id + " - " + produit.categorie.libelleCategorie;
    }
  };

  handleShowPromoDropdown = () => {
    if (this.state.showPromoDropdown) {
      return (
        <Dropdown
          options={this.state.promotions.map((promotion) => {
            if (promotion === null) return "-";
            return promotion.id + " - " + promotion.valeurPromo + "%";
          })}
          onChange={(e) => {
            let produit = this.state.produit;
            if (e.value === "-") {
              produit.promotion = null;
              produit.promotion_id = null;
            } else {
              produit.promotion = this.state.promotions.filter(
                (promotion) =>
                  e.value == promotion.id + " - " + promotion.valeurPromo + "%"
              )[0];
              produit.promotion_id = produit.promotion.id;
            }
            this.setState({ produit });
          }}
          value={this.defaultPromotion()}
        />
      );
    }
  };

  editPic = (e) => {
    let principal_img = URL.createObjectURL(e.target.files[0]);

    let produit = this.state.produit;
    produit.principal_img = e.target.files[0];
    this.setState({
      produit,
      principal_img,
    });
  };

  editOtherPics = (e) => {
    let images = this.state.images;
    images.push(URL.createObjectURL(e.target.files[0]));

    let produit = this.state.produit;
    produit.images.push(e.target.files[0]);
    this.setState({
      produit,
      images,
    });
  };

  is_indesponsableRadios = () => {
    if (!this.state.produit.is_indesponsable) {
      return (
        <td>
          <label className="mx-2">
            <input
              checked
              type="radio"
              name="is_indesponsable"
              className="mx-2"
              onChange={() => {
                let produit = this.state.produit;
                produit.is_indesponsable = false;
                this.setState({ produit });
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
                let produit = this.state.produit;
                produit.is_indesponsable = true;
                this.setState({ produit });
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
                let produit = this.state.produit;
                produit.is_indesponsable = false;
                this.setState({ produit });
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
                let produit = this.state.produit;
                produit.is_indesponsable = true;
                this.setState({ produit });
              }}
            />{" "}
            Oui
          </label>
        </td>
      );
    }
  };

  // initializeProduit = () => {
  //   let produit = this.props.produit;
  //   let images = [];
  //   this.props.produit.images.map((image) => {
  //     if (image.is_principal != 1)
  //       images.push("http://localhost:8000/" + image.image_content);
  //   });

  //   let principal_img = "";
  //   if (this.props.produit.images != []) {
  //     principal_img =
  //       "http://localhost:8000/" +
  //       this.props.produit.images.filter((image) => image.is_principal == 1)[0]
  //         .image_content;
  //   }

  //   this.setState({
  //     produit: produit,
  //     images: images,
  //     principal_img: principal_img,
  //   });
  // };

  render() {
    return (
      <Popup
        trigger={
          <button className="btn rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none">
            <div className="flex items-center">
              <BiDetail className="w-5 h-5" />
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
                onClick={() => {
                  // this.initializeProduit();
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
                        defaultValue={this.state.produit.reference}
                        type="text"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let produit = this.state.produit;
                          produit.reference = e.target.value;
                          this.setState({ produit });
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
                        defaultValue={this.state.produit.titreProduit}
                        type="text"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let produit = this.state.produit;
                          produit.titreProduit = e.target.value;
                          this.setState({ produit });
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
                        defaultValue={this.state.produit.descProduit}
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let produit = this.state.produit;
                          produit.descProduit = e.target.value;
                          this.setState({ produit });
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
                        defaultValue={this.state.produit.stockProduit}
                        type="text"
                        onChange={(e) => {
                          let produit = this.state.produit;
                          produit.stockProduit = parseInt(e.target.value);
                          this.setState({ produit });
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
                        defaultValue={this.state.produit.marque}
                        type="text"
                        onChange={(e) => {
                          let produit = this.state.produit;
                          produit.marque = e.target.value;
                          this.setState({ produit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Théme</td>
                    <td>
                      <input
                        id="theme"
                        defaultValue={this.state.produit.theme}
                        type="text"
                        onChange={(e) => {
                          let produit = this.state.produit;
                          produit.theme = e.target.value;
                          this.setState({ produit });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Prix</td>
                    <td>
                      <input
                        id="prixProduit"
                        defaultValue={this.state.produit.prixProduit}
                        type="text"
                        onChange={(e) => {
                          let produit = this.state.produit;
                          produit.prixProduit = parseFloat(e.target.value);
                          this.setState({ produit });
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
                              let produit = this.state.produit;
                              produit.promotion = null;
                              produit.promotion_id = null;
                              this.setState({
                                produit: produit,
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
                      <Dropdown
                        options={this.state.categories.map((categorie) => {
                          if (categorie === null) return "-";
                          return (
                            categorie.id + " - " + categorie.libelleCategorie
                          );
                        })}
                        onChange={(e) => {
                          let produit = this.state.produit;
                          produit.categorie =
                            e.value == "-"
                              ? null
                              : this.state.categories.filter(
                                  (categorie) =>
                                    e.value ==
                                    categorie.id +
                                      " - " +
                                      categorie.libelleCategorie
                                )[0];
                          produit.categorie_id = produit.categorie.id;
                          this.setState({ produit });
                        }}
                        value={this.defaultCategorie()}
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
                              if (this.state.produit.images.length >= 3) {
                                e.target.hidden = true;
                              }
                            }}
                          >
                            Modifier
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
                  console.log("this.state.produit");
                  console.log(this.state.produit);
                  this.props.changeProduit(this.state.produit);
                  // this.initializeProduit();
                  close();
                }}
              >
                Modifier
              </button>

              <button
                className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                onClick={() => {
                  console.log("modal closed ");
                  // this.initializeProduit();
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

export default EditProduitDash;
