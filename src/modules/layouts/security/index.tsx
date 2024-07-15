import { Card, Checkbox, Grid } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "assets/examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

const Authentication = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container pt={3} pb={25} justifyContent="center">
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h4">Authentication</MDTypography>
          </MDBox>

          <MDBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Current Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Confirm New Password"
                  inputProps={{ type: "password", autoComplete: "" }}
                />
              </Grid>

              <Grid item xs={12}>
                <MDBox display="flex" alignItems="center">
                  <Checkbox />
                  <MDTypography variant="button">Enable 2FA</MDTypography>
                </MDBox>
              </Grid>
            </Grid>

            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
              flexWrap="wrap"
              mt={6}
            >
              <MDBox ml="auto">
                <MDButton variant="gradient" color="dark" size="small">
                  Next
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </DashboardLayout>
  );
};

export default Authentication;
