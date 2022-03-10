import React, { Component } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import EditCategorieDash from "./EditCategorieDash";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class CategorieDash extends Component {
  state = {
    categorie: this.props.categorie,
  };

  popupDeleteCat = (
    <Popup
      trigger={
        <button className="btn rounded shadow-lg p-2 bg-red-400 hover:bg-red-100 text-white font-bold italic hover:text-red-400 focus:outline-none">
          <div className="flex items-center">
            <MdDeleteForever className="w-5 h-5" />
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
              onClick={close}
            >
              <FaTimesCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="font-bold text-third">
            {" "}
            Suppression du catégorie :{" "}
          </div>
          <div className="w-full p-5">
            Vous êtes sur que vous voulez supprimer la catégorie{" "}
            {this.state.categorie.id} ?
          </div>
          <div className="actions">
            <button
              className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
              onClick={() => {
                this.props.deletecategorie(this.state.categorie.id);
                close();
              }}
            >
              Supprimer
            </button>

            <button
              className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
              onClick={() => {
                console.log("modal closed ");
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

  render() {
    return (
      <tr className="border-b-2 text-center">
        <td>{this.props.categorie.id}</td>
        <td>
          <div className="flex w-full justify-center">
            <img
              className="h-16"
              src={
                "http://localhost:8000/" + this.props.categorie.image_content
              }
            />
          </div>
        </td>
        <td>{this.props.categorie.libelleCategorie}</td>
        <td>
          <EditCategorieDash
            categorie={this.props.categorie}
            changecategorie={this.props.changecategorie}
          />
        </td>
        <td>{this.popupDeleteCat}</td>
      </tr>
    );
  }
}

export default CategorieDash;
