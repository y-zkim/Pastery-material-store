import React, { Component } from "react";
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class EditPromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotion: props.promotion,
    };
  }

  initializePromo = () => {
    this.setState({ promotion: this.props.promotion });
  };

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
                        defaultValue={this.state.promotion.descPromo}
                        onChange={(e) => {
                          console.log("e.value =" + e.target.value);
                          let promotion = this.state.promotion;
                          promotion.descPromo = e.target.value;
                          this.setState({ promotion });
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
                        defaultValue={this.state.promotion.valeurPromo}
                        onChange={(e) => {
                          let promotion = this.state.promotion;
                          promotion.valeurPromo = Math.abs(
                            parseFloat(e.target.value)
                          );
                          this.setState({ promotion });
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
                        placeholder="dd-mm-yyyy"
                        defaultValue={this.state.promotion.dateFinPromo}
                        min="1997-01-01"
                        max="2030-12-31"
                        onChange={(e) => {
                          let promotion = this.state.promotion;
                          promotion.dateFinPromo = e.target.value;
                          this.setState({ promotion });
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
                  console.log(this.state.promotion);
                  this.props.changePromotion(this.state.promotion);
                  this.initializePromo();
                  close();
                }}
              >
                Modifier
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

export default EditPromotion;
