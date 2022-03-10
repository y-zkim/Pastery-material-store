import React, { Component } from 'react';
import CommandeTraking from './CommandeTracking';
import Loader from "react-loader-spinner";
import Axios from "../../Axios";

class CommandesTraking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            user: props.user
        }
    }
    
    componentWillMount(){
        this.getCommandesTraking();
    }

    getCommandesTraking() {
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
          Axios.get("/userFactures")
            .then((message) => {
              this.setState({
                isLoaded: true,
                factures: message.data.factures,
              });
            })
            .catch((errors) => {
              console.log("errors");
              console.log(errors);
            });
    }

    handleFacturesLoaded = () => {
        if (this.state.isLoaded && this.state.factures.length > 0) {
            return (
                <div>
                    {this.state.factures.map((facture) => {
                        return <CommandeTraking key={facture.id} facture={facture} />
                    })}
                </div>
            );
            
        } else {
          return (
            <div className="flex justify-center w-full">
              <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
            </div>
          );
        }
      };

    render() { 
        return ( 
            <div className="w-auto xl:px-32 md:px-20 mx-auto mt-10">
                <div className="text-4xl w-full text-center p-5 font-bold text-primary italic">
                    Mes Commandes
                </div>
                <div className="w-full">
                    <div className="border-b-4 font-bold text-primary italic border-primary my-3 text-lg px-4 py-1">
                        Mes Commandes
                    </div>
                    <div className="lg:col-span-3">
                        {this.handleFacturesLoaded()}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default CommandesTraking;