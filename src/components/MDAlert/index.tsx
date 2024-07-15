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

import { ReactNode, useState } from "react";

// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Custom styles for the MDAlert
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import MDAlertRoot from "components/MDAlert/MDAlertRoot";

// Declaring props types for MDAlert
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  dismissible?: boolean;
  dismissTime?: number;
  children: ReactNode;
  [key: string]: any;
}

function MDAlert({
  color,
  dismissible,
  dismissTime,
  children,
  ...rest
}: Props): JSX.Element | null {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate: any = (mount: boolean = true) => {
    if (dismissTime) {
      setTimeout(() => setAlertStatus("fadeOut"), dismissTime);
    }
    return (
      <Fade in={mount} timeout={300}>
        <MDAlertRoot ownerState={{ color }} {...rest}>
          <MDBox display="flex" alignItems="center" color="white">
            {children}
          </MDBox>
          {dismissible ? (
            <MDAlertCloseIcon onClick={mount ? handleAlertStatus : undefined}>
              &times;
            </MDAlertCloseIcon>
          ) : null}
        </MDAlertRoot>
      </Fade>
    );
  };

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Declaring default props for MDAlert
MDAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

export default MDAlert;
