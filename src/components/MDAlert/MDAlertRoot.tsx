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

// @mui material components
import { styled, Theme } from "@mui/material";
import Box from "@mui/material/Box";

export default styled(Box)(({ theme, ownerState }: { theme?: Theme; ownerState: any }) => {
  const { palette, typography, borders, functions } = theme;
  const { color } = ownerState;

  const { white, gradients } = palette;
  const { size, fontWeightMedium } = typography;
  const { borderRadius } = borders;
  const { pxToRem, linearGradient } = functions;

  // backgroundImage value
  const backgroundImageValue = gradients[color]
    ? linearGradient(gradients[color].main, gradients[color].state)
    : linearGradient(gradients.info.main, gradients.info.state);

  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: backgroundImageValue,
    color: white.main,
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    margin: "auto",
    zIndex: 9999,
    padding: pxToRem(12),
    borderRadius: borderRadius.md,
    fontSize: size.md,
    fontWeight: fontWeightMedium,
    width: "fit-content",
  };
});
