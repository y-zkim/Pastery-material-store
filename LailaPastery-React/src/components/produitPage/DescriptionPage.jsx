import React, { Component } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaTruckMoving, FaRegTimesCircle } from "react-icons/fa";

class DescriptionPage extends Component {
  state = {
    showLivraison: false,
    showPaiement: false,
  };

  btnLivraison = () => {
    if (this.state.showLivraison) {
      return <FaRegTimesCircle className="w-5 h-5" />;
    } else {
      return <FiPlusCircle className="w-5 h-5" />;
    }
  };

  btnPaiement = () => {
    if (this.state.showPaiement) {
      return <FaRegTimesCircle className="w-5 h-5" />;
    } else {
      return <FiPlusCircle className="w-5 h-5" />;
    }
  };

  render() {
    return (
      <div className="grid w-full lg:grid-cols-2 mt-10">
        <div className="lg:col-span-1 px-2">
          <div className="w-full font-serif p-2 bg-secondary text-third text-sm text-left">
            Description
          </div>
          <div className="font-mono text-left">
            <p className="whitespace-pre-wrap text-justify">
              {this.props.description}
            </p>
          </div>
        </div>
        <div className="lg:col-span-1 px-2">
          <div className="border-b-2 border-t-2 p-2 mb-2 border-third font-bold flex w-full">
            <span className="text-left">LIVRAISON</span>
            <div className="w-full"></div>
            <button
              className="btn focus:outline-none"
              onClick={() => {
                let showLivraison = this.state.showLivraison;
                showLivraison = !this.state.showLivraison;
                this.setState({ showLivraison });
              }}
            >
              {this.btnLivraison()}
            </button>
          </div>
          <div
            className={
              "m-2 flex justify-center " +
              (this.state.showLivraison ? "" : "hidden")
            }
          >
            <FaTruckMoving className="w-32 h-32" />
          </div>

          <div className="border-b-2 border-t-2 p-2 mb-2 border-third font-bold flex w-full">
            <span className="text-left">PAIEMENT</span>
            <div className="w-full"></div>
            <button
              className="btn focus:outline-none"
              onClick={() => {
                let showPaiement = this.state.showPaiement;
                showPaiement = !this.state.showPaiement;
                this.setState({ showPaiement });
              }}
            >
              {this.btnPaiement()}
            </button>
          </div>
          <div
            className={
              "m-2 flex justify-center " +
              (this.state.showPaiement ? "" : "hidden")
            }
          >
            <FaTruckMoving className="w-32 h-32" />
          </div>
        </div>
      </div>
    );
  }
}

export default DescriptionPage;
