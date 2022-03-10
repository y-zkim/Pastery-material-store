import React, { Component } from 'react';
import AdminDash from "./AdminDash";
import AddAdminDash from "./AddAdminDash";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AdminsDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          admins: [],
          isLoaded: false,
        };
      }
    
      uploadAdmins = () => {
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
        Axios.get("/admins")
          .then((message) => {
            this.setState({
              isLoaded: true,
              admins: message.data.admins,
            });
          })
          .catch((errors) => {
            console.log("errors");
            console.log(errors);
          });
      };
    
      componentWillMount() {
        this.uploadAdmins();
      }
    
      handleDeleteAdmin = (id) => {
        Axios.delete("user/" + id)
          .then((response) => {
            toast.success("L'admin est supprimé", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.uploadAdmins();
          })
          .catch((errors) => {
            toast.error("Vous ne pouvez pas supprimer cet admin", {
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
    
      handleAddAdmin = (newAdmin) => {
        Axios.post("register", newAdmin)
          .then((message) => {
            toast.success("l'admin a crée avec succes", {
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
            toast.error("vous avez commité une erreur", {
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
              {this.state.admins.map((admin) => {
                return (
                  <AdminDash
                    key={admin.id}
                    admin={admin}
                    deleteAdmin={this.handleDeleteAdmin}
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
                <div className="">Admins</div>
                <div className="w-full flex justify-end space-x-4">
                  <AddAdminDash addAdmin={this.handleAddAdmin} />
                </div>
              </div>
    
              <div className="p-10 w-full">
                <table width="100%">
                  <thead className="border-b-2">
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
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
 
export default AdminsDash;