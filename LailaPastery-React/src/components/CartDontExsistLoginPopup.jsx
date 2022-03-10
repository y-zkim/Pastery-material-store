import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaShoppingBasket } from "react-icons/fa";

class CartDontExsistLoginPopup extends Component {
  state = {
    registerUser: {
      nom: "",
      prenom: "",
      sexe: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    registerErrors: {
      nomError: "",
      prenomError: "",
      sexeError: "",
      emailError: "",
      passwordError: "",
      password_confirmationError: "",
    },
    loginUser: {
      email: "",
      password: "",
    },
  };

  render() {
    return (
      <Popup
        trigger={
          <button
            href="/panier"
            className="hover:bg-secondary px-1 py-1 rounded-md text-sm font-medium flex items-center justify-center relative focus:outline-none"
          >
            <FaShoppingBasket className="text-third h-6 w-6" />
          </button>
        }
        modal
        nested
      >
        <div className="text-sm w-full">
          <div className="grid lg:grid-cols-5">
            <div className="border-b-2 lg:border-r-2 lg:col-span-2 px- w-full">
              <div className="text-center text-lg font-bold text-primary w-full">
                S'identifier
              </div>
              <div className="my-5 justify-center w-full">
                <table className="w-full h-full text-md">
                  <tbody>
                    <tr className="h-16">
                      <td className="font-bold">Email : </td>
                      <td>
                        <input
                          name="email"
                          type="text"
                          placeholder="Email"
                          onChange={(event) => {
                            let loginUser = this.state.loginUser;
                            loginUser.email = event.target.value;
                            this.setState({ loginUser });
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
                          onChange={(event) => {
                            let loginUser = this.state.loginUser;
                            loginUser.password = event.target.value;
                            this.setState({ loginUser });
                          }}
                          placeholder="**************"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    name="loginBtn"
                    onClick={() => this.props.loginUser(this.state.loginUser)}
                    className="btn rounded-lg py-1 px-5 text-white bg-primary hover:text-primary hover:bg-white border border-primary focus:outline-none"
                  >
                    S'identifier
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="text-center text-lg font-bold text-primary">
                S'inscrire
              </div>
              <div className="my-5 mx-2">
                <table className="w-full">
                  <tbody>
                    <tr className="h-16">
                      <td className="font-bold">Nom : </td>
                      <td>
                        <input
                          name="nom"
                          type="text"
                          placeholder="Nom"
                          defaultValue={this.state.registerUser.nom}
                          onChange={(event) => {
                            let registerUser = this.state.registerUser;
                            registerUser.nom = event.target.value;
                            this.setState({ registerUser });
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
                          defaultValue={this.state.registerUser.prenom}
                          onChange={(event) => {
                            let registerUser = this.state.registerUser;
                            registerUser.prenom = event.target.value;
                            this.setState({ registerUser });
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
                                let registerUser = this.state.registerUser;
                                registerUser.sexe = "H";
                                this.setState({ registerUser });
                              }}
                            />
                            Homme
                          </div>
                          <div className="mx-5 flex items-center">
                            <input
                              name="sexe"
                              type="radio"
                              onClick={(event) => {
                                let registerUser = this.state.registerUser;
                                registerUser.sexe = "F";
                                this.setState({ registerUser });
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
                          defaultValue={this.state.registerUser.email}
                          onChange={(event) => {
                            let registerUser = this.state.registerUser;
                            registerUser.email = event.target.value;
                            this.setState({ registerUser });
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
                          defaultValue={this.state.registerUser.password}
                          onChange={(event) => {
                            let registerUser = this.state.registerUser;
                            registerUser.password = event.target.value;
                            this.setState({ registerUser });
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
                            this.state.registerUser.password_confirmation
                          }
                          onChange={(event) => {
                            let registerUser = this.state.registerUser;
                            registerUser.password_confirmation =
                              event.target.value;
                            this.setState({ registerUser });
                          }}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="w-full flex justify-center">
                  <button
                    name="signUpBtn"
                    onClick={() => this.props.addUser(this.state.registerUser)}
                    className="btn rounded-lg py-1 px-5 text-white bg-primary hover:text-primary hover:bg-white border border-primary focus:outline-none"
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

export default CartDontExsistLoginPopup;
