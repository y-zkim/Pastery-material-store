import React, { Component } from "react";
import Articles from "../Articles";

class BlogsFound extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="grid grid-cols-6 items-center py-5 mx-auto">
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
          <div className="col-span-2">
            <h5 className="font-serif font-bold italic text-primary text-center">
              Articles
            </h5>
          </div>
          <div className="col-span-2">
            <div className="bg-primary rounded-full w-full h-1"></div>
          </div>
        </div>

        <Articles />
      </div>
    );
  }
}

export default BlogsFound;
