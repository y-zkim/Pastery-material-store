import React, { Component } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class BannerDash extends Component {
    state = {
        banner: this.props.banner,
      };
    
      popupDeleteBanner = (
        <Popup
          trigger={
            <button className="btn rounded shadow-lg p-2 bg-red-400 hover:bg-red-100 text-white font-bold italic hover:text-red-400 focus:outline-none">
              <div className="flex items-center">
                <MdDeleteForever className="w-5 h-5" />
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
                  onClick={close}
                >
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold text-third">
                {" "}
                Suppression du banniére :{" "}
              </div>
              <div className="w-full p-5">
                Vous êtes sur que vous voulez supprimer la banniére{" "}
                {this.state.banner.id} ?
              </div>
              <div className="actions">
                <button
                  className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
                  onClick={() => {
                    this.props.deleteBanner(this.state.banner.id);
                    close();
                  }}
                >
                  Supprimer
                </button>
    
                <button
                  className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                  onClick={() => {
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
    
      render() {
        return (
          <tr className="border-b-2 text-center">
            <td>{this.state.banner.id}</td>
            <td>
              <div className="flex w-full justify-center">
                <img
                  className="h-24"
                  src={
                    "http://localhost:8000/" + this.state.banner.image
                  }
                />
              </div>
            </td>
            <td>{this.state.banner.description}</td>
            <td>{this.popupDeleteBanner}</td>
          </tr>
        );
      }
}
 
export default BannerDash;