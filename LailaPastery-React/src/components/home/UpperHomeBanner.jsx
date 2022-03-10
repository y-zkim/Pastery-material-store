import React, { Component } from "react";
import Loader from "react-loader-spinner";

import "react-responsive-carousel/lib/styles/carousel.min.css";
var Carousel = require("react-responsive-carousel").Carousel;

class UpperHomeBanner extends Component {
  state = {
    banners: [],
    isLoaded: false,
  };

  componentWillMount() {
    fetch("http://127.0.0.1:8000/api/banner")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          banners: result.banners,
          isLoaded: true,
        });
      });
  }

  showBanners = () => {
    if (this.state.isLoaded) {
      return (
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          useKeyboardArrows={true}
          swipeable={true}
          emulateTouch={true}
          stopOnHover={false}
          interval="3000"
        >
          {this.state.banners.map((banner) => {
            return (
              <div className="w-full">
                <img src={"http://localhost:8000/" + banner.image} className="w-full object-cover" alt="" />
              </div>
            );
          })}
        </Carousel>
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
      <div className="w-full">
        {this.showBanners()}
      </div>
    );
  }
}

export default UpperHomeBanner;
