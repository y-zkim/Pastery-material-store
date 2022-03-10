import React, { Component } from "react";
import Article from "../components/Article";

class Articles extends Component {
  state = {};
  render() {
    return (
      <div>
        <h5 className="text-center font-serif italic text-ms">
          Recettes préparé utilisant ce produit :
        </h5>
        <div className="w-full grid xl:grid-cols-4 grid-cols-2 mt-3 mx-auto">
          <Article />
          <Article />
          <Article />
          <Article />
        </div>
        <div className="bg-secondary border-2 border-primary rounded-lg text-center font-sans text-sm mx-auto">
          <a href="">
            <h3 className="font-bold text-gray-700">Voire plus</h3>
          </a>
        </div>
      </div>
    );
  }
}

export default Articles;
