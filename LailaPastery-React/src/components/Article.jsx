import React, { Component } from "react";
import mouna from "../assets/mouna.jpg";

class Article extends Component {
  state = {};
  render() {
    return (
      <div className="border-2 border-primary rounded-xl bg-secondary m-3 p-1 text-center font-sans text-sm h-58">
        <div className="flex justify-center">
          <img className="h-40" src={mouna} alt="" />
        </div>
        <h5 className="font-bold text-gray-700">Brioche Mouna de Pâques</h5>
      </div>
    );
  }
}

export default Article;
