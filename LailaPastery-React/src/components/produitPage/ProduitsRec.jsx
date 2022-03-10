import React, { Component } from "react";
import Produit from "../Produit";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

class ProduitsRec extends Component {
  state = {};

  searchingProducts = (produits) => {
    let table = [];
    for (let i = 0; i < produits.length; i++) {
      table.push(
        <Produit
          detail={produits[i]}
          changeProduit={this.props.changeProduit}
        />
      );
    }
    return table;
  };

  clickHandler = (imgUrl, i) => {
    const newTable = this.state.tables.map((table) => {
      if (table.id == i) {
        table.isClicked = true;
      } else {
        table.isClicked = false;
      }
    });

    this.setState({ newTable });
  };
  render() {
    let table = this.state.pictures.map((imgUrl, i) => (
      <button
        className="focus:outline-none"
        key={i}
        onClick={() => this.clickHandler(imgUrl, i)}
      >
        <img
          src={imgUrl}
          className={
            "h-16 mx-2 border border-primary p-1 rounded-lg " +
            (this.state.tables[i].isClicked ? "ring-1 ring-primary" : "")
          }
          onClick={() => {
            this.currentIndex = i;
            this.clickHandler(
              this.state.pictures[this.currentIndex],
              this.currentIndex
            );
          }}
        />
      </button>
    ));
    return (
      <div className="grid grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 mt-2 mx-auto">
        <button className="focus:outline-none">
          <BsChevronCompactLeft
            className="h-10 w-10 text-primary"
            onClick={() => {
              this.currentIndex--;
              if (this.currentIndex < 0)
                this.currentIndex = this.state.pictures.length - 1;
              this.clickHandler(
                this.state.pictures[this.currentIndex],
                this.currentIndex
              );
            }}
          />
        </button>
        {this.searchingProducts(this.props.produits)}
        <button className="focus:outline-none">
          <BsChevronCompactRight
            className="h-10 w-10 text-primary"
            onClick={() => {
              this.currentIndex++;
              if (this.currentIndex >= this.state.pictures.length)
                this.currentIndex = 0;
              this.clickHandler(
                this.state.pictures[this.currentIndex],
                this.currentIndex
              );
            }}
          />
        </button>
      </div>
    );
  }
}

export default ProduitsRec;
