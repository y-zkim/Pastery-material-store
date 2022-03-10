import React, { Component } from "react";
import searchFailed from "../../assets/searchFailed.jpg";

class NoProductFound extends Component {
  state = {};
  render() {
    return (
      <div className="w-full text-center">
        <div className="flex justify-center">
          <img src={searchFailed} alt="" className="w-1/3" />
        </div>
        <h1 className="text-2xl font-bold italic text-primary">
          Aucun produit trouvé
        </h1>
      </div>
    );
  }
}

export default NoProductFound;
