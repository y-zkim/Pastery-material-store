import React, { Component } from 'react';
import { TiPlus } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";

import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class AddAdminDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newAdmin: {
            nom: "",
            prenom: "",
            sexe: "",
            email: "",
            is_admin: 1,
            password: "",
            password_confirmation: "",
          },
        };
      }
    
      initializePromo = () => {
        let newAdmin = {
            nom: "",
            prenom: "",
            sexe: "",
            email: "",
            is_admin: 1,
            password: "",
            password_confirmation: "",
        };
        this.setState({ newAdmin: newAdmin });
      };
    
      render() {
        return (
          <Popup
            trigger={
              <button className="btn rounded-lg py-1 px-3 flex items-center bg-secondary font-bold text-primary border focus:outline-none hover:text-secondary hover:bg-primary hover:border-secondary">
                <TiPlus className="h-5 w-5" />
                Ajouter Admin
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
                <div className="font-bold text-third"> Ajouter admin : </div>
                <div className="w-full p-5">
                  <table className="w-full text-xs">
                    <tbody>
                        <tr className="h-16">
                        <td className="font-bold">Nom : </td>
                        <td>
                            <input
                            name="nom"
                            type="text"
                            placeholder="Nom"
                            defaultValue={this.state.newAdmin.nom}
                            onChange={(event) => {
                                let newAdmin = this.state.newAdmin;
                                newAdmin.nom = event.target.value;
                                this.setState({ newAdmin });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </td>
                        </tr>

                        <tr className="h-16">
                        <td className="font-bold">Prénom : </td>
                        <td>
                            <input
                            name="prenom"
                            type="text"
                            placeholder="Prénom"
                            defaultValue={this.state.newAdmin.prenom}
                            onChange={(event) => {
                                let newAdmin = this.state.newAdmin;
                                newAdmin.prenom = event.target.value;
                                this.setState({ newAdmin });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </td>
                        </tr>

                        <tr className="h-16">
                        <td className="font-bold">Sexe : </td>
                        <td>
                            <div className="flex items-center h-full">
                            <div className="mx-5 flex items-center">
                                <input
                                name="sexe"
                                type="radio"
                                onClick={(event) => {
                                    let newAdmin = this.state.newAdmin;
                                    newAdmin.sexe = "H";
                                    this.setState({ newAdmin });
                                }}
                                />
                                Homme
                            </div>
                            <div className="mx-5 flex items-center">
                                <input
                                name="sexe"
                                type="radio"
                                onClick={(event) => {
                                    let newAdmin = this.state.newAdmin;
                                    newAdmin.sexe = "F";
                                    this.setState({ newAdmin });
                                }}
                                />
                                Femme
                            </div>
                            </div>
                        </td>
                        </tr>

                        <tr className="h-16">
                        <td className="font-bold">Email : </td>
                        <td>
                            <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            defaultValue={this.state.newAdmin.email}
                            onChange={(event) => {
                                let newAdmin = this.state.newAdmin;
                                newAdmin.email = event.target.value;
                                this.setState({ newAdmin });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </td>
                        </tr>

                        <tr className="h-16">
                        <td className="font-bold">Mot de passe : </td>
                        <td>
                            <input
                            name="pwd"
                            type="password"
                            placeholder="**************"
                            defaultValue={this.state.newAdmin.password}
                            onChange={(event) => {
                                let newAdmin = this.state.newAdmin;
                                newAdmin.password = event.target.value;
                                this.setState({ newAdmin });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </td>
                        </tr>

                        <tr className="h-16">
                        <td className="font-bold">
                            {" "}
                            Confirmer le Mot de passe :{" "}
                        </td>
                        <td>
                            <input
                            name="pwdConf"
                            type="password"
                            placeholder="**************"
                            defaultValue={
                                this.state.newAdmin.password_confirmation
                            }
                            onChange={(event) => {
                                let newAdmin = this.state.newAdmin;
                                newAdmin.password_confirmation =
                                event.target.value;
                                this.setState({ newAdmin });
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      this.props.addAdmin(this.state.newAdmin);
                      this.initializePromo();
                      close();
                    }}
                  >
                    Ajouter
                  </button>
    
                  <button
                    className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                    onClick={() => {
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
 
export default AddAdminDash;