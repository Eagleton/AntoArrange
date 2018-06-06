import React from "react";
import PropTypes from "prop-types";
import { withStyles, AppBar, Toolbar, Button} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Menu from "@material-ui/core/Menu";
import MenuItem from"@material-ui/core/MenuItem";

import cx from "classnames";
import headerStyle from "../assets/jss/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>

        <Toolbar className={classes.container}>
            <div className={classes.flex} >
                <Button className={classes.title}>
                    {makeBrand()}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"基础信息管理"}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"自动排课"}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"选择课程"}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"论坛交流"}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"在线测试"}
                </Button>
                <Button variant="flat" className={classes.title}>
                    {"成绩管理"}
                </Button>
            </div>

        </Toolbar>

    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
