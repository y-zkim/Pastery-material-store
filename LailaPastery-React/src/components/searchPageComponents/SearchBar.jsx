import React, { Component } from "react";
import { Slider } from "primereact/slider";
import { FaStar, FaRegStar } from "react-icons/fa";
import { RangeStepInput } from "react-range-step-input";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    const searchBoxHeader =
      "border-2 border-primary rounded-lg font-sans text-sm mt-3";
    const searchBoxBody =
      "bg-secondary border-b-2 text-center italic font-sans border-primary";

    let sliderValue = Math.ceil(props.prixProduitRanges[1]);

    this.state = {
      sliderValue,
      searchBoxHeader,
      searchBoxBody,
    };
  }

  stars = () => {
    let table = [];
    for (let i = 5; i >= 1; i--) {
      let child = [];
      let childOfChild = [];
      for (let j = 1; j <= 5; j++) {
        if (j <= i) {
          childOfChild.push(<FaStar />);
        } else {
          childOfChild.push(<FaRegStar />);
        }
      }

      child.push(
        <input type="checkbox" name={i + "-stars"} className="mr-2" />
      );
      child.push(<label className="flex">{childOfChild}</label>);
      table.push(<div className="flex text-sm text-yellow">{child}</div>);
    }
    return table;
  };
  render() {
    return (
      <div className="md:col-span-1">
        <button className="bg-secondary border-2 border-primary rounded-lg text-center font-sans text-sm focus:outline-none w-full" onClick={() =>{this.props.affinerRecherche();this.props.nePasManquer("")}}>
          <h5 className="text-third">Affiner ma recherche</h5>
        </button>

        <div className={this.state.searchBoxHeader}>
          <div className={this.state.searchBoxBody}>
            <h5>A ne pas manquer</h5>
          </div>

          <div className="p-2">
            <div className="flex content-start items-center">
              <input type="checkbox" name="En Stock" checked={this.props.filters.includes("En Stock")} onChange={() =>this.props.nePasManquer("En Stock")} />
              <label className="ml-2" htmlFor="En Stock">
                En&nbsp;Stock&nbsp;({this.props.En_Stock})
              </label>
            </div>

            <div className="flex content-start items-center">
              <input type="checkbox" name="Promotions" checked={this.props.filters.includes("Promotions")} onChange={() =>this.props.nePasManquer("Promotions")} />
              <label className="ml-2" htmlFor="Promotions">
                Promotions&nbsp;({this.props.promotions})
              </label>
            </div>
          </div>
        </div>

        <div className={this.state.searchBoxHeader}>
          <div className={this.state.searchBoxBody}>
            <h5>Thémes</h5>
          </div>

          <div className="p-2">
            {this.props.themes.map((theme) => (
              <div className="flex content-start items-center">
                <input
                  type="radio"
                  name="theme"
                  checked={theme == this.props.selectedTheme}
                  onChange={() => this.props.selectTheme(theme)}
                />
                <label className="ml-2">{theme}</label>
              </div>
            ))}
          </div>
        </div>

        {/* <div className={this.state.searchBoxHeader}>
          <div className={this.state.searchBoxBody}>
            <h5>Prix</h5>
          </div>

          <div className="p-2 flex items-center">
            <h5>{Math.floor(this.props.prixProduitRanges[0])}&nbsp;DH</h5>
            <div className="w-full">
              <RangeStepInput
                min={Math.floor(this.props.prixProduitRanges[0])}
                max={Math.ceil(this.props.prixProduitRanges[1])}
                value={this.state.sliderValue}
                step={1}
                onChange={(e) => this.setState({ sliderValue: e.target.value })}
              />
            </div>
            <h5>{this.state.sliderValue}&nbsp;DH</h5>
          </div>
        </div> */}

        {/* <div className={this.state.searchBoxHeader}>
          <div className={this.state.searchBoxBody}>
            <h5>Notes</h5>
          </div>

          <div className="p-2">{this.stars()}</div>
        </div> */}
      </div>
    );
  }
}

export default SearchBar;
