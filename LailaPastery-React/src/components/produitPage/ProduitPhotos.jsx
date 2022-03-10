import React, { Component } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

class ProduitPhotos extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      imgsClassList: "h-16 mx-2 border border-primary rounded-lg p-1",
      images: props.images,
      tables: [],
    };

    const tables = this.state.tables;

    for (let i = 0; i < this.state.images.length; i++) {
      tables.push({ id: i, isClicked: false });
    }
    this.setState({ tables });

    this.clickHandler(this.state.images[this.currentIndex], this.currentIndex);
  }

  ringSelectedPic(event) {
    console.log(event.target.classList);
    event.target.classList =
      this.classlist + "rounded-lg p-1 ring ring-primary";
  }

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

  currentIndex = 0;

  render() {
    let table = this.state.images.map((imgUrl, i) => (
      <button
        className="focus:outline-none"
        key={i}
        onClick={() => this.clickHandler(imgUrl, i)}
      >
        <img
          src={"http://localhost:8000/" + imgUrl.image_content}
          className={
            "h-16 mx-2 border border-primary p-1 rounded-lg " +
            (this.state.tables[i].isClicked ? "ring-1 ring-primary" : "")
          }
          onClick={() => {
            this.currentIndex = i;
            this.clickHandler(
              this.state.images[this.currentIndex].image_content,
              this.currentIndex
            );
          }}
        />
      </button>
    ));
    return (
      <div className="p-5">
        <div className="grid grid-rows-6">
          <div className="row-span-5 flex justify-center">
            <button className="focus:outline-none">
              <BsChevronCompactLeft
                className="h-10 w-10 text-primary"
                onClick={() => {
                  this.currentIndex--;
                  if (this.currentIndex < 0)
                    this.currentIndex = this.state.images.length - 1;
                  this.clickHandler(
                    this.state.images[this.currentIndex].image_content,
                    this.currentIndex
                  );
                }}
              />
            </button>
            <div className="flex justify-center w-full">
              <img
                id="imgProduit"
                src={
                  "http://localhost:8000/" +
                  this.state.images[this.currentIndex].image_content
                }
                className="h-64"
              />
            </div>
            <button className="focus:outline-none">
              <BsChevronCompactRight
                className="h-10 w-10 text-primary"
                onClick={() => {
                  this.currentIndex++;
                  if (this.currentIndex >= this.state.images.length)
                    this.currentIndex = 0;
                  this.clickHandler(
                    this.state.images[this.currentIndex].image_content,
                    this.currentIndex
                  );
                }}
              />
            </button>
          </div>
          <div className="row-span-1 flex justify-center">{table}</div>
        </div>
      </div>
    );
  }
}

export default ProduitPhotos;
