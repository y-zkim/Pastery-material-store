import React, { Component } from "react";

import PromotionDash from "./PromotionDash";
import AddPromoDash from "./AddPromoDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PromotionsDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      isLoaded: false,
    };
  }

  uploadPromotions = () => {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          promotions: result.promotions,
          isLoaded: true,
        })
      );
  };

  componentWillMount() {
    this.uploadPromotions();
  }

  handleDeletePromo = (idPromo) => {
    Axios.delete("promotion/" + idPromo)
      .then((response) => {
        toast.success("La promotion est supprimé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadPromotions();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas supprimer cette promotion", {
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

  handleChangePromo = (promo) => {
    Axios.put("promotion/" + promo.id, promo)
      .then((response) => {
        toast.success("La promotion est changé", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadPromotions();
      })
      .catch((errors) => {
        toast.error("Vous ne pouvez pas changer cette promotion", {
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

  handleAjouterPromo = (promo) => {
    Axios.post("promotion", promo)
      .then((response) => {
        toast.success("La promotion a ajouté", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.uploadPromotions();
      })
      .catch((errors) => {
        toast.error("La promotion n'a pas ajouté", {
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
          {this.state.promotions.map((promotion) => {
            return (
              <PromotionDash
                key={promotion.id}
                promotion={promotion}
                changePromotion={this.handleChangePromo}
                deletePromotion={this.handleDeletePromo}
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
            <div className="">Promotions</div>
            <div className="w-full flex justify-end space-x-4">
              <AddPromoDash ajouterPromo={this.handleAjouterPromo} />
            </div>
          </div>

          <div className="p-10 w-full">
            <table width="100%">
              <thead className="border-b-2">
                <tr>
                  <th>id</th>
                  <th>descPromo</th>
                  <th>valeurPromo</th>
                  <th>dateFinPromo</th>
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

export default PromotionsDash;
