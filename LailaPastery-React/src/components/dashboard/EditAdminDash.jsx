import React, { Component } from 'react';
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class EditAdminDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          admin: props.admin,
        };
      }
    
      initializeAdmin = () => {
        this.setState({ admin: this.props.admin });
      };
    
      render() {
        const { admin } = this.state;
        return (
          <Popup
            trigger={
              <button className="btn rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none">
                <div className="flex items-center">
                  <BiDetail className="w-5 h-5" />
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
                    onClick={() => {
                      this.initializeAdmin();
                      close();
                    }}
                  >
                    <FaTimesCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="font-bold text-third"> Détails de l'admin : </div>
                <div className="w-full p-5">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="h-8 border-b-2">
                      <td className="font-bold">Nom : </td>
                      <td> 
                          <input type="text" className="w-full text-center border bg-white" value={admin.nom} /> 
                      </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Prénom : </td>
                      <td> 
                          <input type="text" className="w-full text-center border bg-white" value={admin.prenom} /> 
                      </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Email : </td>
                      <td> <input type="text" className="w-full text-center border bg-gray-100" value={admin.email}/> </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Sexe : </td>
                      <td> <input type="text" className="w-full text-center border bg-gray-100" value={admin.sexe == "H" ? "Homme" : "Femme"}/> </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Ville : </td>
                      <td> 
                          <input type="text" className="w-full text-center border bg-white" value={admin.ville} /> 
                      </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Adresse : </td>
                      <td> 
                          <textarea type="text" className="w-full text-center border bg-white" value={admin.adresse} /> 
                      </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Code Postale: </td>
                      <td> 
                          <input type="text" className="w-full text-center border bg-white" value={admin.codePostale} /> 
                      </td>
                    </tr>
                    <tr className="h-8 border-b-2">
                      <td className="font-bold">Telephone : </td>
                      <td> 
                          <input type="text" className="w-full text-center border bg-white" value={admin.telephone} /> 
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="actions">
                  <button
                    className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                    onClick={() => {
                      close();
                    }}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </Popup>
        );
      }
}
 
export default EditAdminDash;