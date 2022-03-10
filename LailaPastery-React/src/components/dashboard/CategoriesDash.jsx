import React, { Component } from "react";
import CategorieDash from "./CategorieDash";
import AddCategorieDash from "./AddCategorieDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CategoriesDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoaded: false,
    };
  }

  uploadCategories = () => {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.categories);
        this.setState({
          categories: result.categories,
          isLoaded: true,
        });
      });
  };

  componentWillMount() {
    this.uploadCategories();
  }

  handleDeleteCat = (idCat) => {
    Axios.delete("categorie/" + idCat)
      .then((response) => {
        toast.success("La categorie est supprimé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadCategories();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas supprimer cette categorie", {
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

  handleChangeCat = (cat) => {
    let fData = new FormData();
    fData.append("libelle", cat.libelleCategorie);
    fData.append("image", cat.image_content);
    Axios.post("categorie", fData);
    Axios.put("categorie/" + cat.id, cat)
      .then((response) => {
        toast.success("La categorie est changé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadCategories();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas changer cette categorie", {
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

  handleAjouterCat = (cat) => {
    let fData = new FormData();
    fData.append("libelle", cat.libelle);
    fData.append("image", cat.image);
    Axios.post("categorie", fData)
      .then((response) => {
        toast.success("La categorie a ajouté", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadCategories();
      })
      .catch((errors) => {
        toast.error("La categorie n'a pas ajouté", {
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

  tableBody = (isLoaded) => {
    if (isLoaded) {
      return (
        <tbody>
          {this.state.categories.map((categorie) => {
            return (
              <CategorieDash
                key={categorie.id}
                categorie={categorie}
                changecategorie={this.handleChangeCat}
                deletecategorie={this.handleDeleteCat}
              />
            );
          })}
        </tbody>
      );
    } else {
      return (
        <tbody>
          <tr>
            <td>
              <div className="flex justify-center w-full">
                <Loader
                  type="ThreeDots"
                  color="#F06970"
                  height="50"
                  width="100"
                />
              </div>
            </td>
          </tr>
        </tbody>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="m-5 rounded-xl border bg-white shadow-2xl">
          <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
            <div className="">Catégories</div>
            <div className="w-full flex justify-end space-x-4">
              <AddCategorieDash ajouterCategorie={this.handleAjouterCat} />
            </div>
          </div>

          <div className="p-10 w-full">
            <table width="100%">
              <thead className="border-b-2">
                <tr>
                  <th>id</th>
                  <th>Image</th>
                  <th>Libelle</th>
                  <th>Détails</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              {this.tableBody(this.state.isLoaded)}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesDash;
