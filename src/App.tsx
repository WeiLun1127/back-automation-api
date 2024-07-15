/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { JSXElementConstructor, Key, ReactElement, useEffect, useState } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components

// Material Dashboard 2 PRO React TS exampless

// Material Dashboard 2 PRO React TS themes
import theme from "modules/settings/theme-settings/theme";

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from "modules/settings/theme-settings/theme-dark";

// RTL plugins

// Material Dashboard 2 PRO React TS routes

// Material Dashboard 2 PRO React TS contexts
import { setMiniSidenav, useMaterialUIController } from "context";

// Images
import Home from "modules/layouts";
import Bank from "modules/layouts/Bank";
import Transactions from "modules/layouts/report";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes: any[]): any =>
    allRoutes.map(
      (route: {
        collapse: any;
        route: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        key: Key;
      }) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      }
    );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {/* {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Back Automation Office"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )} */}
      {/* {layout === "vr" && <Configurator />} */}
      <Routes>
        {/* {getRoutes(routes)} */}
        <Route path="/" element={<Home />} />
        <Route path="/bank/:bankCode" element={<Bank />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
