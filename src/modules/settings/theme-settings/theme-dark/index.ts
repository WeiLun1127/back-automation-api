/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React TS Base Styles
import colors from "../theme/theme-dark/base/colors";
import breakpoints from "../theme/theme-dark/base/breakpoints";
import typography from "../theme/theme-dark/base/typography";
import boxShadows from "../theme/theme-dark/base/boxShadows";
import borders from "../theme/theme-dark/base/borders";
import globals from "../theme/theme-dark/base/globals";

// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from "../theme/theme-dark/functions/boxShadow";
import hexToRgb from "../theme/theme-dark/functions/hexToRgb";
import linearGradient from "../theme/theme-dark/functions/linearGradient";
import pxToRem from "../theme/theme-dark/functions/pxToRem";
import rgba from "../theme/theme-dark/functions/rgba";

// Material Dashboard 2 PRO React TS components base styles for @mui material components
import sidenav from "../theme/theme-dark/components/sidenav";
import list from "../theme/theme-dark/components/list";
import listItem from "../theme/theme-dark/components/list/listItem";
import listItemText from "../theme/theme-dark/components/list/listItemText";
import card from "../theme/theme-dark/components/card";
import cardMedia from "../theme/theme-dark/components/card/cardMedia";
import cardContent from "../theme/theme-dark/components/card/cardContent";
import button from "../theme/theme-dark/components/button";
import iconButton from "../theme/theme-dark/components/iconButton";
import input from "../theme/theme-dark/components/form/input";
import inputLabel from "../theme/theme-dark/components/form/inputLabel";
import inputOutlined from "../theme/theme-dark/components/form/inputOutlined";
import textField from "../theme/theme-dark/components/form/textField";
import menu from "../theme/theme-dark/components/menu";
import menuItem from "../theme/theme-dark/components/menu/menuItem";
import switchButton from "../theme/theme-dark/components/form/switchButton";
import divider from "../theme/theme-dark/components/divider";
import tableContainer from "../theme/theme-dark/components/table/tableContainer";
import tableHead from "../theme/theme-dark/components/table/tableHead";
import tableCell from "../theme/theme-dark/components/table/tableCell";
import linearProgress from "../theme/theme-dark/components/linearProgress";
import breadcrumbs from "../theme/theme-dark/components/breadcrumbs";
import slider from "../theme/theme-dark/components/slider";
import avatar from "../theme/theme-dark/components/avatar";
import tooltip from "../theme/theme-dark/components/tooltip";
import appBar from "../theme/theme-dark/components/appBar";
import tabs from "../theme/theme-dark/components/tabs";
import tab from "../theme/theme-dark/components/tabs/tab";
import stepper from "../theme/theme-dark/components/stepper";
import step from "../theme/theme-dark/components/stepper/step";
import stepConnector from "../theme/theme-dark/components/stepper/stepConnector";
import stepLabel from "../theme/theme-dark/components/stepper/stepLabel";
import stepIcon from "../theme/theme-dark/components/stepper/stepIcon";
import select from "../theme/theme-dark/components/form/select";
import formControlLabel from "../theme/theme-dark/components/form/formControlLabel";
import formLabel from "../theme/theme-dark/components/form/formLabel";
import checkbox from "../theme/theme-dark/components/form/checkbox";
import radio from "../theme/theme-dark/components/form/radio";
import autocomplete from "../theme/theme-dark/components/form/autocomplete";
import flatpickr from "../theme/theme-dark/components/flatpickr";
import container from "../theme/theme-dark/components/container";
import popover from "../theme/theme-dark/components/popover";
import buttonBase from "../theme/theme-dark/components/buttonBase";
import icon from "../theme/theme-dark/components/icon";
import svgIcon from "../theme/theme-dark/components/svgIcon";
import link from "../theme/theme-dark/components/link";
import dialog from "../theme/theme-dark/components/dialog";
import dialogTitle from "../theme/theme-dark/components/dialog/dialogTitle";
import dialogContent from "../theme/theme-dark/components/dialog/dialogContent";
import dialogContentText from "../theme/theme-dark/components/dialog/dialogContentText";
import dialogActions from "../theme/theme-dark/components/dialog/dialogActions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
