import React, { Component } from "react";
import { TiPlus } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";

import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class AddPromoDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPromo: {
        descPromo: "",
        valeurPromo: "",
        dateFinPromo: null,
      },
    };
  }

  initializePromo = () => {
    let newPromo = {
      descPromo: "",
      valeurPromo: "",
      dateFinPromo: null,
    };
    this.setState({ newPromo: newPromo });
  };

  render() {
    console.log(this.state.newPromo.dateFinPromo);
    return (
      <Popup
        trigger={
          <button className="btn rounded-lg py-1 px-3 flex items-center bg-secondary font-bold text-primary border focus:outline-none hover:text-secondary hover:bg-primary hover:border-secondary">
            <TiPlus className="h-5 w-5" />
            Ajouter Promotion
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
                  this.initializePromo();
                  close();
                }}
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-third"> Détails du promotion : </div>
            <div className="w-full p-5">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Descreption</td>
                    <td>
                      <textarea
                        id="descPromo"
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let newPromo = this.state.newPromo;
                          newPromo.descPromo = e.target.value;
                          this.setState({ newPromo });
                        }}
                        className="shadow appearance-none text-center border rounded w-full h-14 mt-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Pourcentage</td>
                    <td>
                      <input
                        id="valeurPromo"
                        type="text"
                        onChange={(e) => {
                          let newPromo = this.state.newPromo;
                          newPromo.valeurPromo = Math.abs(
                            parseFloat(e.target.value)
                          );
                          this.setState({ newPromo });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Fin du Promotion</td>
                    <td>
                      <input
                        id="dateFinPromo"
                        type="date"
                        placeholder="YYYY/MM/DD"
                        onChange={(e) => {
                          let newPromo = this.state.newPromo;
                          newPromo.dateFinPromo = e.target.value;
                          this.setState({ newPromo });
                        }}
                        className="shadow appearance-none text-center border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="actions">
              <button
                className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
                onClick={() => {
                  this.props.ajouterPromo(this.state.newPromo);
                  this.initializePromo();
                  close();
                }}
              >
                Ajouter
              </button>

              <button
                className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                onClick={() => {
                  console.log("modal closed ");
                  this.initializePromo();
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

export default AddPromoDash;
