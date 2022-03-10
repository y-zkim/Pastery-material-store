import React, { Component } from "react";
import CommandeDash from "./CommandeDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CommandesDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factures: [],
      isLoaded: false,
    };
  }

  uploadCommandes = () => {
    Axios.interceptors.request.use(
      (config) => {
        config.headers.authorization =
          "Bearer " + JSON.parse(localStorage.getItem("data")).token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    Axios.get("payedFactures").then((response) => {
      this.setState({
        factures: response.data.factures,
        isLoaded: true,
      });
    });
  };

  componentWillMount() {
    this.uploadCommandes();
  }

  handleChangeCommande = (commande) => {
    Axios.put("basket/" + commande.id, {
      method: "updateEtat",
      etat: commande.etat,
    })
      .then((response) => {
        toast.success("L'état a changé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadCommandes();
      })
      .catch((errors) => {
        toast.error("L'état n'a pas changé", {
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
          {this.state.factures.map((facture) => {
            return (
              <CommandeDash
                key={facture.id}
                facture={facture}
                changeCommande={this.handleChangeCommande}
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
    console.log(this.state.factures);
    return (
      <div>
        <div className="m-5 rounded-xl border bg-white shadow-2xl">
          <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
            <div className="">Commandes</div>
          </div>

          <div className="p-10 w-full">
            <table width="100%">
              <thead className="border-b-2">
                <tr>
                  <th>id</th>
                  <th>Nombre d'article</th>
                  <th>Etat</th>
                  <th>Totale</th>
                  <th>Date de commande</th>
                  <th>Détails</th>
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

export default CommandesDash;
