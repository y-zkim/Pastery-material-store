import React, { Component } from 'react';
import Axios from "../../Axios";
import { toast } from "react-toastify";

class ResetPassword extends Component {
    state = { 
        email: '',
        token: '',
        password:'',
        password_confirmation:''
     }

     componentWillMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let token = '';
        let email = '';
        if (urlParams.has("token") && urlParams.has("email")) {
            token = urlParams.get("token");
            email = urlParams.get("email");
        } else {
            window.location.href = "/";
        }
        this.setState({ token: token, email: email });
     }

     reset_password = () => {
        Axios.interceptors.request.use(
            (config) => {
              config.headers.authorization =
                "Bearer " + this.state.token;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
          Axios.post("password/reset", {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          }).then((response) => {
            toast.success("Changement de mot de passe a succes", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            window.location.href = "/";
          });
     }

    render() { 
        return ( 
            <div class="flex justify-center items-center m-10 p-5">
                <div className="bg-white shadow-lg p-5">
                <h2 className="italic">Donnez un nouveau mot de passe</h2>
                <table className="w-full text-md">
                    <tbody>
                    <tr className="h-8 border-b-2">
                        <td className="font-bold">email : </td>
                        <td> 
                            <input type="text" className="w-full text-center border bg-white" value={this.state.email} /> 
                        </td>
                    </tr>

                    <tr className="h-8 border-b-2">
                        <td className="font-bold">Mot de passe : </td>
                        <td> 
                            <input type="password" className="w-full text-center border bg-white" value={this.state.password} 
                            onChange={(event) => {
                                let password = this.state.password;
                                password = event.target.value;
                                this.setState({ password });
                            }}/> 
                        </td>
                    </tr>
                    
                    <tr className="h-8 border-b-2">
                        <td className="font-bold">Confiramation du mot de passe : </td>
                        <td> 
                            <input type="password" className="w-full text-center border bg-white" value={this.state.password_confirmation} 
                            onChange={(event) => {
                                let password_confirmation = this.state.password_confirmation;
                                password_confirmation = event.target.value;
                                this.setState({ password_confirmation });
                            }}/> 
                        </td>
                    </tr>
                    
                    
                    </tbody>
                </table>

                <button className="btn rounded shadow-lg p-2 m-5 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none"
                        onClick={() => this.reset_password()}
               >
                    Modifier
                </button>
                </div>
                
            </div>
         );
    }
}
 
export default ResetPassword;