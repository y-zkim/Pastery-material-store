import React, { Component } from "react";
import Loader from "react-loader-spinner";

class CategoriesBanner extends Component {
  state = {
    categories: [],
    isLoaded: false,
  };

  uploadCategories = () => {
    fetch("http://127.0.0.1:8000/api/products/create")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.categories);
        this.setState({
          categories: result.categories,
          isLoaded: true,
        });
      });
  };

  componentWillMount() {
    this.uploadCategories();
  }

  showCategories = () => {
    if (this.state.isLoaded) {
      return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
          {this.state.categories.map((categorie) => {
            return (
              <div key={categorie.id} className="lg:mx-10 mx-3 my-2">
                <a
                  href={"/SearchProducts?cat=" + categorie.id}
                  className="w-auto"
                >
                  <div className="focus:outline-none p-1">
                    <div className="flex justify-center">
                      <div className="rounded-lg border-4 border-primary p-1">
                        <img
                          src={
                            "http://localhost:8000/" + categorie.image_content
                          }
                          className="h-52 rounded-lg border-4 border-primary shadow"
                          alt=""
                        />
                      </div>
                    </div>
                    <span className="text-center text-lg font-bold italic text-third">
                      {categorie.libelleCategorie}
                    </span>
                  </div>
                </a>
              </div>
            );
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
        <div className="grid w-full grid-cols-6 items-center">
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
          <div className="col-span-2">
            <h5 className="font-serif font-bold italic text-primary text-center text-2xl">
              Catégories
            </h5>
          </div>
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
        </div>
        {this.showCategories()}
      </div>
    );
  }
}

export default CategoriesBanner;
