import React, { Component } from "react";
import { BiDetail } from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import Popup from "reactjs-popup";
import "react-dropdown/style.css";
import "reactjs-popup/dist/index.css";

class EditCategorieDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "http://localhost:8000/" + this.props.categorie.image_content,
      categorie: props.categorie,
    };
  }

  initializeCategorie = () => {
    this.setState({ categorie: this.props.categorie });
  };

  editPic = (e) => {
    let image = URL.createObjectURL(e.target.files[0]);

    let categorie = this.state.categorie;
    categorie.image = e.target.files[0];
    this.setState({
      categorie,
      image,
    });
  };

  render() {
    return (
      <Popup
        trigger={
          <button className="btn rounded shadow-lg p-2 bg-blue-400 hover:bg-blue-100 text-white font-bold italic hover:text-blue-400 focus:outline-none">
            <div className="flex items-center">
              <BiDetail className="w-5 h-5" />
            </div>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="rounded-xl shadow-xl text-center py-3">
            <div className="close flex justify-end">
              <button
                className="btn focus:outline-none rounded-xl text-red-500 hover:text-white hover:bg-red-500"
                onClick={() => {
                  this.initializeCategorie();
                  close();
                }}
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-third"> Détails du categorie : </div>
            <div className="w-full p-5">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Libélle</td>
                    <td>
                      <textarea
                        id="libelle"
                        defaultValue={this.state.categorie.libelleCategorie}
                        onChange={(e) => {
                          let categorie = this.state.categorie;
                          categorie.libelle = e.target.value;
                          this.setState({ categorie });
                        }}
                        className="shadow appearance-none text-center border rounded w-full h-14 mt-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </td>
                  </tr>
                  <tr className="h-8 border-b-2">
                    <td className="font-bold">Image</td>
                    <td>
                      <div className="flex justify-center space-x-10">
                        <img src={this.state.image} className="h-16" alt="" />

                        <div className="flex justify-center items-center">
                          <button
                            className="btn rounded-lg px-3 bg-green-400 text-white border hover:text-green-400 hover:bg-white hover:border-green-400 focus:outline-none"
                            onClick={(e) => {
                              this.inputFile.click();
                              e.target.hidden = true;
                            }}
                          >
                            Changer
                            <input
                              ref={(ref) => (this.inputFile = ref)}
                              type="file"
                              defaultValue=""
                              accept="image/*"
                              required
                              hidden={true}
                              onChange={(e) => this.editPic(e)}
                            />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="actions">
              <button
                className="btn rounded-lg py-1 px-3 text-white bg-blue-500 hover:text-blue-500 hover:bg-white border hover:border-blue-500 mx-5 focus:outline-none"
                onClick={() => {
                  console.log(this.state.categorie);
                  this.props.changecategorie(this.state.categorie);
                  this.initializeCategorie();
                  close();
                }}
              >
                Modifier
              </button>

              <button
                className="btn rounded-lg py-1 px-3 text-white bg-red-500 hover:text-red-500 hover:bg-white border hover:border-red-500 mx-5 focus:outline-none"
                onClick={() => {
                  console.log("modal closed ");
                  this.initializeCategorie();
                  close();
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default EditCategorieDash;
