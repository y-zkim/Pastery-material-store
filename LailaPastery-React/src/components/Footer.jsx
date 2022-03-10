import React, { Component } from "react";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  FaShippingFast,
  FaComments,
  FaFacebookSquare,
  FaInstagram,
} from "react-icons/fa";
import Axios from "../Axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class Footer extends Component {
  state = {
    newsletter: {
      email: "",
    }
  };

  sendNewsletter = () => {
    Axios.post("newsletter", this.state.newsletter)
      .then((message) => {
        toast.success("Votre email est ajouté â la newsletter", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((errors) => {
        if(errors.response.data.errors === undefined){
          toast.warn("Vous avez déja inscrit â la newsletter", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Inserer un email valide", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        
      });
  }

  render() {
    return (
      <div className="mt-10">
        <div className="w-auto xl:px-32 md:px-20 mx-auto">
          <div className="grid xl:grid-cols-4 lg:grid-cols-2">
            <div className="text-center m-5 border-2 border-primary shadow-xl p-5">
              <div className="w-full flex justify-center">
                <RiCustomerService2Fill className="h-24 w-24 text-primary" />
              </div>
              <h1 className="text-serif italic font-bold text-lg">
                Service Client
              </h1>
              <h2 className="text-serif italic text-sm">
                Votre Satisfactionest notre Objectif
              </h2>
            </div>

            <div className="text-center m-5 border-2 border-primary shadow-xl p-5">
              <div className="w-full flex justify-center">
                <FaShippingFast className="h-24 w-24 text-primary" />
              </div>
              <h1 className="text-serif italic font-bold text-lg">
                Livraison Gratuite
              </h1>
              <h2 className="text-serif italic text-sm">
                Votre Satisfactionest notre Objectif
              </h2>
            </div>

            <div className="text-center m-5 border-2 border-primary shadow-xl p-5">
              <div className="w-full flex justify-center">
                <GiTakeMyMoney className="h-24 w-24 text-primary" />
              </div>
              <h1 className="text-serif italic font-bold text-lg">
                Paiement à la livraison
              </h1>
              <h2 className="text-serif italic text-sm">
                Votre Satisfactionest notre Objectif
              </h2>
            </div>

            <div className="text-center m-5 border-2 border-primary shadow-xl p-5">
              <div className="w-full flex justify-center">
                <FaComments className="h-24 w-24 text-primary" />
              </div>
              <h1 className="text-serif italic font-bold text-lg">
                Avis Clients
              </h1>
              <h2 className="text-serif italic text-sm">
                Votre Satisfactionest notre Objectif
              </h2>
            </div>
          </div>

          <div className="border border-primary p-5 mt-5 shadow-xl">
            <h1 className="font-serif text-primary font-bold text-xl">
              La Newsletter
            </h1>
            <div className="grid lg:grid-cols-2 mt-2">
              <div>
                <h1 className="font-serif text-lg text-left">
                  Tenez-vous informé(e) de l'actualité et des événements de
                  Prestige Cake en vous abonnant à notre newsletter.
                </h1>
              </div>

              <div>
                <div className="bg-white flex items-center rounded-lg border w-full border-2 border-primary">
                  <input
                    className="w-full px-2 text-third leading-tight font-medium focus:outline-none"
                    id="newslatter"
                    type="text"
                    placeholder="Saissez votre Email ..."
                    onChange={(event) => this.setState({newsletter : {email: event.target.value}})
                    }
                  />
                  <button 
                    onClick={() => this.sendNewsletter()}
                    className="text-white hover:text-primary rounded-tr-lg rounded-br-lg p-1 bg-primary hover:bg-white focus:outline-none flex items-center justify-center border border-primary font-bold"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary w-full h-20 mt-10">
          <div className="w-auto xl:px-40 md:px-32 px-10 mx-auto">
            <div className="grid md:grid-cols-4 grid-cols-2 py-7 text-left">
              <div>
                <h1 className="font-serif text-third italic font-bold text-md mt-3">
                  Prestige Cake
                  <br />
                </h1>
                <div className="font-serif text-third text-sm">
                  <a href="#" className="text-third">
                    Qui Sommes-nous ?
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Nos Engagements
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Paiement & Livraison
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Mentions Légales
                  </a>
                </div>
              </div>

              <div>
                <h1 className="font-serif text-third italic font-bold text-md mt-3">
                  En Ce Moment
                  <br />
                </h1>
                <div className="font-serif text-third text-sm">
                  <a href="#" className="text-third">
                    Promotions
                  </a>
                  <br />
                  <a href="#" className="text-third">
                   Indisponsables
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Marques
                  </a>
                </div>
              </div>

              <div>
                <h1 className="font-serif text-third italic font-bold text-md mt-3">
                  Mon Espace Personnel
                  <br />
                </h1>
                <div className="font-serif text-third text-sm">
                  <a href="#" className="text-third">
                    Mon Compte
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Mon Panier
                  </a>
                  <br />
                  <a href="#" className="text-third">
                    Suivre Mes Commandes
                  </a>
                </div>
              </div>

              <div>
                <h1 className="font-serif text-third italic font-bold text-md mt-3">
                  Suivez-Nous !<br />
                </h1>

                <div className="font-serif flex text-third text-sm">
                  <a href="#" className="text-third">
                    <FaFacebookSquare className="w-5 h-5 mr-2" />
                  </a>
                  <a href="#" className="text-third">
                    <FaInstagram className="w-5 h-5 mr-2" />
                  </a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
