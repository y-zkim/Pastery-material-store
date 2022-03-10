import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { ToastContainer, toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51J63WmDVIJ0xFn3AokS93xM6MV4xkJ6OGBVVpKBBud3sJ4fJhMHAI8VE9H9TkeUvGixvb58COpB5dylJCOLGgmzj00ZhooTCbZ",
  {
    stripeAccount: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
  }
);

class PaiementInfos extends Component {
  state = {
    nom: this.props.user.nom,
    prenom: this.props.user.prenom,
    email: this.props.user.email,
    adresse: this.props.user.adresse,
    telephone: this.props.user.telephone,
    payement: "COD",
    total: this.props.totalFacture,
  };

  handleCardInput = () => {
    if (this.state.payement == "CBC")
      return (
        <Elements stripe={stripePromise}>
          {" "}
          <CheckoutForm />
        </Elements>
      );
  };

  verifyCard = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.nom == "") {
      toast.error("Saisissez votre nom", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.prenom == "") {
      toast.error("Saisissez votre prenom", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.email == "") {
      toast.error("Saisissez votre email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!this.state.email.match(validRegex)) {
      toast.error("Verifiez votre email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.adresse == "") {
      toast.error("Saisissez votre adresse", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.telephone == "") {
      toast.error("Saisissez votre telephone", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (this.state.telephone.match(/\d/g).length != 10) {
      toast.error("Verifiez votre telephone", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.props.pay(this.state);
    }
  };

  render() {
    return (
      <div className="border-4 border-primary rounded-xl px-5 py-2 w-full text-center mt-5">
        <div className="border-b-2 border-primary  text-primary italic font-bold text-lg">
          Informations de livraison
        </div>
        <div className="text-xs w-full mt-2 font-bold italic">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Nom</td>
                <td>
                  <input
                    type="text"
                    name="nom"
                    defaultValue={this.state.nom}
                    onChange={(e) => this.setState({ nom: e.target.value })}
                    className="shadow appearance-none my-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              </tr>
              <tr>
                <td>Préom</td>
                <td>
                  <input
                    type="text"
                    name="prenom"
                    defaultValue={this.state.prenom}
                    onChange={(e) => this.setState({ prenom: e.target.value })}
                    className="shadow appearance-none my-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    defaultValue={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="shadow appearance-none my-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              </tr>
              <tr>
                <td>Adresse</td>
                <td>
                  <textarea
                    type="text"
                    name="adresse"
                    defaultValue={this.state.adresse}
                    onChange={(e) => this.setState({ adresse: e.target.value })}
                    className="shadow appearance-none my-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              </tr>
              <tr>
                <td>Téléphone</td>
                <td>
                  <input
                    type="text"
                    name="telephone"
                    defaultValue={this.state.telephone}
                    onChange={(e) =>
                      this.setState({ telephone: e.target.value })
                    }
                    className="shadow appearance-none my-1 border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="grid grid-cols-2 p-2">
            <div className="flex w-full justify-center items-center">
              <input
                type="radio"
                name="paiementMode"
                checked={this.state.payement === "COD"}
                onChange={() => {
                  this.setState({ payement: "COD" });
                }}
              />
              <label>Paiement à la livraison</label>
            </div>
            <div className="flex w-full justify-center items-center">
              <input
                type="radio"
                name="paiementMode"
                checked={this.state.payement === "CBC"}
                onChange={() => {
                  this.setState({ payement: "CBC" });
                }}
              />
              <label>Paiement par carte</label>
            </div>
          </div>
          {this.handleCardInput()}

          <button
            onClick={() => this.verifyCard()}
            className="btn rounded-lg py-1 px-3 mt-2 flex items-center bg-primary font-bold text-white border focus:outline-none hover:text-primary hover:bg-white hover:border-primary w-full flex justify-center"
          >
            Passer la commande
          </button>
        </div>
      </div>
    );
  }
}

export default PaiementInfos;
