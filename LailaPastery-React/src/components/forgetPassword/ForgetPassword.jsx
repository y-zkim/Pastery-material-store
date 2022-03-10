import React, { Component } from 'react';
import { GrFormClose } from "react-icons/gr";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Axios from "../../Axios";

class ForgetPassword extends Component {
    state = { 
        email: '',
        email_error: false,
        active_button: false,
     }

     showEmailError = () => {
         if(this.state.email_error) {
             return (
                 <div className="flex text-red-500 space-x-2">
                     <GrFormClose className="w-7 h-7" />
                     <span>Inserer un vrai email.</span>
                 </div>
             );
         } else if(this.state.email != "" && !this.state.email_error) {
            return (
                <div className="flex text-green-500 space-x-2">
                    <IoCheckmarkDoneOutline className="w-7 h-7" />
                    <span>votre email est juste.</span>
                </div>
            );
        }
     }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    send_email = () => {
          Axios.post("password/email", {
            email: this.state.email,
          }).then((response) => {
            window.location.href = "/";
          });
    }

    render() { 
        return ( 
            <div class="flex justify-center items-center m-10 p-5">
                <div className="bg-white shadow-lg p-5">
                <h2 className="italic">Vous avez oubliée votre mot de passe ?</h2>
                <h6 className="italic">Inserez votre email :</h6>
                <table className="w-full text-md">
                    <tbody>
                        <tr className="h-8 border-b-2">
                            <td className="font-bold">email : </td>
                            <td> 
                                <input type="text" className="w-full text-center border bg-white" value={this.state.email} 
                                onChange={(event) => {
                                    let email = event.target.value;
                                    let email_error = !this.validateEmail(event.target.value);
                                    let active_button = event.target.value !== "" && this.validateEmail(event.target.value);
                                    this.setState({ email, email_error, active_button });
                                }}/> 
                            </td>
                        </tr>
                    </tbody>
                </table>

                {this.showEmailError()}

                <button className="btn rounded shadow-lg p-2 m-5 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none"
                        onClick={() => {
                            if(this.state.active_button) {
                                this.send_email();
                            }
                        }}
               >
                    Envoyer
                </button>
                </div>
                
            </div>
         );
    }
}
 
export default ForgetPassword;