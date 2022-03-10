import React, { Component } from "react";
import Menu from "./Menu";
import HomeDash from "./HomeDash";
import BannersDash from "./BannersDash";
import ProduitsDash from "./ProduitsDash";
import PromotionsDash from "./PromotionsDash";
import CategoriesDash from "./CategoriesDash";
import CommandesDash from "./CommandesDash";
import FacturesDash from "./FacturesDash";
import HistoriesDash from "./HistoriesDash";
import AdminsDash from "./AdminsDash";
import NewsletterDash from "./NewsletterDash";
import ProfileDash from "./ProfileDash";

class Dashboard extends Component {
  state = {
    choosenView: 0,
  };

  componentWillMount() {
    this.props.RedirectVersAcceuil();
  }

  editChoosenView = (choosenView) => {
    this.setState({ choosenView });
  };

  handleViews = () => {
    if (this.state.choosenView == 0) {
      return <HomeDash />;
    } else if (this.state.choosenView == 1) {
      return <BannersDash />;
    } else if (this.state.choosenView == 2) {
      return <ProduitsDash />;
    } else if (this.state.choosenView == 3) {
      return <PromotionsDash />;
    } else if (this.state.choosenView == 4) {
      return <CategoriesDash />;
    } else if (this.state.choosenView == 5) {
      return <CommandesDash />;
    } else if (this.state.choosenView == 6) {
      return <FacturesDash />;
    } else if (this.state.choosenView == 7) {
      return <HistoriesDash />;
    } else if (this.state.choosenView == 8) {
      return <AdminsDash />;
    } else if (this.state.choosenView == 9) {
      return <NewsletterDash />;
    } else if (this.state.choosenView == 10) {
      return <ProfileDash user={this.props.user} editUser={this.props.editUser} />;
    }
  };

  render() {
    return (
      <div className="grid grid-cols-6 w-screen">
        <div className="col-span-1 bg-secondary shadow-2xl">
          <div className="h-screen">
            <Menu
              editChoosenView={this.editChoosenView}
              choosenView={this.state.choosenView}
              logoutUser={this.props.logoutUser}
            />
          </div>
        </div>
        <div className="col-span-5 bg-gray-100">{this.handleViews()}</div>
      </div>
    );
  }
}

export default Dashboard;
