import React, { Component } from 'react';
import BannerDash from "./BannerDash";
import AddBannerDash from "./AddBannerDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class BannersDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          banners: [],
          isLoaded: false,
        };
      }
    
      uploadBanners = () => {
        fetch("http://127.0.0.1:8000/api/banner")
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              banners: result.banners,
              isLoaded: true,
            });
          });
      };
    
      componentWillMount() {
        this.uploadBanners();
      }
    
      handleDeleteBanner = (idBanner) => {
        Axios.delete("banner/" + idBanner)
          .then((response) => {
            toast.success("La banniére est supprimé", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.uploadBanners();
          })
          .catch((errors) => {
            toast.error("Vous ne pouvez pas supprimer cette banniére", {
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
    
      handleChangeBanner = (banner) => {
        let fData = new FormData();
        fData.append("description", banner.description);
        fData.append("image", banner.image);
        Axios.put("banner/" + banner.id, banner)
          .then((response) => {
            toast.success("La banniére est changé", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.uploadBanners();
          })
          .catch((errors) => {
            toast.error("Vous ne pouvez pas changer cette banniére", {
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
    
      handleAjouterBanner = (banner) => {
        let fData = new FormData();
        fData.append("description", banner.description);
        fData.append("image", banner.image);
        Axios.post("banner", fData)
          .then((response) => {
            toast.success("La banniére est ajouté", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.uploadBanners();
          })
          .catch((errors) => {
            toast.error("La banniére n'ast pas ajouté", {
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
              {this.state.banners.map((banner) => {
                return (
                  <BannerDash
                    key={banner.id}
                    banner={banner}
                    changeBanner={this.handleChangeBanner}
                    deleteBanner={this.handleDeleteBanner}
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
                <div className="">Banniére</div>
                <div className="w-full flex justify-end space-x-4">
                  <AddBannerDash ajouterBanniere={this.handleAjouterBanner} />
                </div>
              </div>
    
              <div className="p-10 w-full">
                <table width="100%">
                  <thead className="border-b-2">
                    <tr>
                      <th>id</th>
                      <th>Image</th>
                      <th>Déscription</th>
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
 
export default BannersDash;