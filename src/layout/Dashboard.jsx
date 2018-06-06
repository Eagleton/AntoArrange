import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";


import Header from "../component/Header";
import Sidebar  from "../component/Sidebar";

import dashboardRoutes from "../routes/dashboard.jsx";
import appStyle from "../assets/jss/appStyle.jsx";
import logo from "../assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"教学服务系统"}
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
          <div className={classes.mainPanel} ref="mainPanel">
              <Header
                  routes={dashboardRoutes}
                  handleDrawerToggle={this.handleDrawerToggle}
                  {...rest}
              />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
