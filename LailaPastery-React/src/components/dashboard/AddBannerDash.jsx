import React, { Component } from 'react';
import { TiPlus } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Popup from "reactjs-popup";

import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class AddBannerDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          image: "",
          newBanner: {
            description: "",
            image: null,
          },
        };
      }
    
      initializeBanner = () => {
        let newBanner = {
          description: "",
          image: null,
        };
        this.setState({ image: "", newBanner: newBanner });
      };
    
      editPic = (e) => {
        let image = URL.createObjectURL(e.target.files[0]);
    
        let newBanner = this.state.newBanner;
        newBanner.image = e.target.files[0];
        this.setState({
          newBanner,
          image,
        });
      };
    
      render() {
        return (
          <Popup
            trigger={
              <button className="btn rounded-lg py-1 px-3 flex items-center bg-secondary font-bold text-primary border focus:outline-none hover:text-secondary hover:bg-primary hover:border-secondary">
                <TiPlus className="h-5 w-5" />
                Ajouter banniére
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
                      this.initializeBanner();
                      close();
                    }}
                  >
                    <FaTimesCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="font-bold text-third"> Détails de Banniére : </div>
                <div className="w-full p-5">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="h-8 border-b-2">
                        <td className="font-bold">Déscription</td>
                        <td>
                          <textarea
                            id="description"
                            onChange={(e) => {
                              let newBanner = this.state.newBanner;
                              newBanner.description = e.target.value;
                              this.setState({ newBanner });
                            }}
                            className="shadow appearance-none text-center border rounded w-full h-14 mt-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </td>
                      </tr>
                      <tr className="h-8 border-b-2">
                        <td className="font-bold">Image</td>
                        <td>
                          <div className="flex justify-center space-x-10">
                            <img src={this.state.image} className="h-16" alt="" />
    
                            <div className="flex justify-center items-center">
                              <button
                                className="btn rounded-lg px-3 bg-green-400 text-white border hover:text-green-400 hover:bg-white hover:border-green-400 focus:outline-none"
                                onClick={(e) => {
                                  this.inputFile.click();
                                }}
                              >
                                Choisir
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
                    </tbody>
                  </table>
                </div>
                <div className="actions">
                    <div className="text-center text-primary text-md flex justify-center items-center my-2">
                        <BsFillInfoCircleFill />
                        <span className="mx-2" >Inserez une image sous forme 1710x655 </span>
                    </div>
                  <button
                    className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
                    onClick={() => {
                      this.props.ajouterBanniere(this.state.newBanner);
                      this.initializeBanner();
                      close();
                    }}
                  >
                    Ajouter
                  </button>
    
                  <button
                    className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                    onClick={() => {
                      this.initializeBanner();
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
 
export default AddBannerDash;