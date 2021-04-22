import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
//  * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div style={{width:"fixed"}} >
      <div className="row h-100">
        <div className="col-md-2">
          <Menu />
        </div>
        <div className="col-sm-8 col-md-9 col-xl-10  content">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
