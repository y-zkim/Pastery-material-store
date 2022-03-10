import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchProduct from "./components/searchPageComponents/SearchProduct";
import ProduitPage from "./components/produitPage/ProduitPage";
import Cart from "./components/cart/Cart";
import Facture from "./components/facture/Facture";
import Home from "./components/home/Home";
import ProfileDash from "./components/dashboard/ProfileDash";
import CommandesTraking from "./components/commandesTraking/CommandesTraking";
import CategoriesBanner from "./components/home/CategoriesBanner";
import ResetPassword from "./components/forgetPassword/ResetPassword";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "./Axios";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";

import Dashboard from "./components/dashboard/Dashboard";

import "react-toastify/dist/ReactToastify.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartLoaded: false,
      user: JSON.parse(localStorage.getItem("user")),
      commande: {
        produits: [],
      },
      registeredUser: null,
    };
  }

  componentWillMount() {
    if (this.state.user !== null) {
      this.handleGetCommande();
    }
  }

  handleLoginUser = (loggedInUser) => {
    Axios.post("login", {
      email: loggedInUser.email,
      password: loggedInUser.password,
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("data", JSON.stringify(response.data));
      window.location.reload();
    }).catch((errors) => {
      toast.error("l'email ou mot de passe n'est pas correct", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });;
  };

  handleGetCommande = () => {
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
    Axios.get("/cart")
      .then((message) => {
        console.log("data");
        console.log(message.data);
        this.setState({
          isCartLoaded: true,
          commande: message.data.commande[0],
        });
      })
      .catch((errors) => {
        console.log("errors");
        console.log(errors);
      });
  };

  handleAddUser = (registerUser) => {
    Axios.post("register", registerUser)
      .then((message) => {
        toast.success("Votre compte a crée avec succes", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.handleLoginUser(registerUser);
      })
      .catch((errors) => {
        console.log(errors)
        toast.error("Le compte n'a pas crée", {
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
  
  handleEditUser = (user) => {
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
    Axios.put("user/" + user.id, user)
      .then((message) => {
      localStorage.setItem("user", JSON.stringify(message.data.user));
        toast.success("la modification a succes", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({user: message.data.user})
      })
      .catch((errors) => {
        toast.error("la modification n'a pas succes", {
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

  handleLogoutUser = () => {
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
    Axios.post("logout")
      .then((message) => {
        localStorage.clear();
        window.location.href = "/";
      })
      .catch((errors) => {
        console.log("errors");
        console.log(errors);
      });
  };

  addProduitToCommande = (produit_id, quantite) => {
    if (JSON.parse(localStorage.getItem("data")) !== null) {
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
      Axios.post("basket", {
        quantite: quantite,
        product_id: produit_id,
      }).then((response) => {
        console.log(response.data);
        this.handleGetCommande();
      });
    } else {
      toast.info("Vous devez être connecter", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  removeProduitFromCommande = (produit_id) => {
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
    Axios.put("basket/" + this.state.commande.id, {
      method: "delete",
      product_id: produit_id,
    }).then((response) => {
      console.log(response.data);
      this.handleGetCommande();
    });
  };

  updateProduitInCommande = (produit_id, quantite) => {
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
    Axios.put("basket/" + this.state.commande.id, {
      method: "update",
      quantite: quantite,
      product_id: produit_id,
    }).then((response) => {
      console.log(response.data);
      this.handleGetCommande();
    });
  };

  handleLoadCard = () => {
    if (this.state.isCartLoaded) {
      return (
        <Cart
          user={this.state.user}
          commande={this.state.commande}
          addProduitToCommande={this.addProduitToCommande}
          removeProduitFromCommande={this.removeProduitFromCommande}
          updateProduitInCommande={this.updateProduitInCommande}
          getCommande={this.handleGetCommande}
        />
      );
    } else {
      <div className="flex justify-center w-full">
        <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
      </div>;
    }
  };

  handleLoadFacture = () => {
    if (this.state.isCartLoaded) {
      return (
        <Facture
          user={this.state.user}
          commande={this.state.commande}
          pay={this.pay}
        />
      );
    } else {
      <div className="flex justify-center w-full">
        <Loader type="ThreeDots" color="#F06970" height="50" width="100" />
      </div>;
    }
  };

  RedirectVersDash = () => {
    if (this.state.user !== null) {
      if (this.state.user.is_admin === 1) {
        window.location.href = "/dashboard";
      }
    }
  };

  RedirectVersAcceuil = () => {
    if (this.state.user !== null) {
      if (this.state.user.is_admin !== 1) {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  };

  pay = (infos) => {
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
    console.log(JSON.parse(localStorage.getItem("data")).token);
    Axios.post("pay", infos).then((response) => {
      console.log(response.data);
      this.handleGetCommande();
      toast.success("Votre commande a bien passer", {
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
  };

  render() {
    return (
      <Router>
        <Helmet>
          <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
        </Helmet>
        <div className="App">
          <Switch>
            <Route path="/Dashboard" exact>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Dashboard
                RedirectVersAcceuil={this.RedirectVersAcceuil}
                logoutUser={this.handleLogoutUser}
                user={this.state.user}
                editUser={this.handleEditUser}
              />
            </Route>
            <Route path="/">
              <NavBar
                RedirectVersDash={this.RedirectVersDash}
                user={this.state.user}
                commande={this.state.commande}
                addUser={this.handleAddUser}
                logoutUser={this.handleLogoutUser}
                loginUser={this.handleLoginUser}
                getCommande={this.handleGetCommande}
              />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Route path="/" exact>
                <Home
                  user={this.state.user}
                  commande={this.state.commande}
                  addProduitToCommande={this.addProduitToCommande}
                  removeProduitFromCommande={this.removeProduitFromCommande}
                />
              </Route>
              
              <Route path="/reset_password" exact>
                <ResetPassword />
              </Route>
              
              <Route path="/forget_password" exact>
                <ForgetPassword />
              </Route>

              <Route path="/Produit/:id" exact>
                <ProduitPage
                  user={this.state.user}
                  commande={this.state.commande}
                  addProduitToCommande={this.addProduitToCommande}
                  removeProduitFromCommande={this.removeProduitFromCommande}
                />
              </Route>

              <Route path="/SearchProducts" exact component={SearchProduct}>
                <SearchProduct
                  user={this.state.user}
                  commande={this.state.commande}
                  addProduitToCommande={this.addProduitToCommande}
                  removeProduitFromCommande={this.removeProduitFromCommande}
                />
              </Route>

              <Route path="/Categories" exact component={CategoriesBanner}>
                <CategoriesBanner
                  user={this.state.user}
                  commande={this.state.commande}
                  addProduitToCommande={this.addProduitToCommande}
                  removeProduitFromCommande={this.removeProduitFromCommande}
                />
              </Route>

              <Route path="/Panier" exact>
                {this.handleLoadCard()}
              </Route>

              <Route path="/Facture" exact>
                {this.handleLoadFacture()}
              </Route>
              
              <Route path="/Profile" exact>
                <ProfileDash user={this.state.user} editUser={this.handleEditUser} />
              </Route>
              
              <Route path="/track" exact>
                <CommandesTraking user={this.state.user} />
              </Route>

              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
