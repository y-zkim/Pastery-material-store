import React, { Component } from 'react';
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import Loader from "react-loader-spinner";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NewsletterDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newsletters: [],
          isLoaded: false,
        };
      }
    
      export = () => {
        if (this._export !== null) {
          this._export.save();
        }
      };

      uploadNewsletters = () => {
        Axios.get("/newsletter")
          .then((message) => {
              console.log(message.data.newsletters);
            this.setState({
              isLoaded: true,
              newsletters: message.data.newsletters,
            });
          })
          .catch((errors) => {
            console.log("errors");
            console.log(errors);
          });
      };
    
      componentWillMount() {
        this.uploadNewsletters();
      }
    
      tableBody = (isLoaded) => {
        if (isLoaded) {
          return (
            <ExcelExport
                data={this.state.newsletters}
                ref={(exporter) => (this._export = exporter)}
            >
                <Grid
                data={this.state.newsletters}
                style={{
                    height: "420px",
                }}
                >
                    <GridToolbar>
                        <button
                        title="Newsletter"
                        className="p-2 rounded mb-2 bg-primary text-white"
                        onClick={this.export}
                        >
                        Exporter l'Excel
                        </button>
                    </GridToolbar>
                    <GridColumn field="id" title="ID" width="50px" />
                    <GridColumn field="email" title="Email" width="200px" />
                    <GridColumn field="created_at" title="Date d'inscription"/>
                </Grid>
            </ExcelExport>
          );
        } else {
          return (
            <tbody>
              <tr>
                <td>
                  <div className="flex justify-center w-full">
                    <Loader
                      type="ThreeDots"
                      color="#F06970"
                      height="50"
                      width="100"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          );
        }
      };
    
      render() {
        return (
          <div>
            <div className="m-5 rounded-xl border bg-white shadow-2xl">
              <div className="flex items-center bg-primary rounded-xl p-5 shadow-2xl text-white font-bold w-full">
                <div className="">Newsletters</div>
              </div>
              
              
              <div className="p-10 w-full">
                {this.tableBody(this.state.isLoaded)}
              </div>
            </div>
          </div>
        );
      }
}
 
export default NewsletterDash;