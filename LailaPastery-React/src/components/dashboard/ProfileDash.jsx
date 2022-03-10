import React, { Component } from 'react';

class ProfileDash extends Component {
    state = { user:this.props.user }
    render() { 
        let {user} = this.state;
        return ( 
            <div className="m-5 rounded-xl border bg-white shadow-2xl">
                <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
                    <div className="">Profile</div>
                </div>
                <div className="w-full p-5">
              <table className="w-full text-md">
                <tbody>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Nom : </td>
                    <td> 
                        <input type="text" className="w-full text-center border bg-white" value={user.nom} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.nom = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Prénom : </td>
                    <td> 
                        <input type="text" className="w-full text-center border bg-white" value={user.prenom} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.prenom = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Email : </td>
                    <td> <input type="text" className="w-full text-center border bg-gray-100" value={user.email}/> </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Sexe : </td>
                    <td> <input type="text" className="w-full text-center border bg-gray-100" value={user.sexe == "H" ? "Homme" : "Femme"}/> </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Ville : </td>
                    <td> 
                        <input type="text" className="w-full text-center border bg-white" value={user.ville} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.ville = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Adresse : </td>
                    <td> 
                        <textarea type="text" className="w-full text-center border bg-white" value={user.adresse} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.adresse = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Code Postale: </td>
                    <td> 
                        <input type="text" className="w-full text-center border bg-white" value={user.codePostale} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.codePostale = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Telephone : </td>
                    <td> 
                        <input type="text" className="w-full text-center border bg-white" value={user.telephone} 
                        onChange={(event) => {
                            let user = this.state.user;
                            user.telephone = event.target.value;
                            this.setState({ user });
                          }}/> 
                    </td>
                  </tr>
                  
                  
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
               <button className="btn rounded shadow-lg p-2 m-5 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none"
                        onClick={() => this.props.editUser(this.state.user)}
               >
                    Modifier
                </button> 
               <button className="btn rounded shadow-lg p-2 m-5 bg-red-400 hover:bg-red-100 text-white font-bold italic hover:text-red-400 focus:outline-none"
                        onClick={()=> this.setState({user: this.props.user})}
               >
                    Annuler
                </button> 
            </div>
            
            </div>
         );
    }
}
 
export default ProfileDash;