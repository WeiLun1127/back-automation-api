import { Card, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Banks = [
  {
    label: "Maybank",
    value: "mbb",
  },
  {
    label: "Hong Leong Bank",
    value: "hlb",
  },
  {
    label: "CIMB",
    value: "cimb",
  },
  {
    label: "Public Bank",
    value: "pbb",
  },
  {
    label: "RHB",
    value: "rhb",
  },
  {
    label: "BSN",
    value: "bsn",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState("bank");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedBank(event.target.value);
  };

  const handleLaunchBank = () => {
    if (selectedBank === "bank") return;
    navigate(`/bank/${selectedBank}`);
  };

  return (
    <DashboardLayout>
      <Grid container justifyContent="center">
        <Grid item display="flex" justifyContent="center" lg={12} xl={8}>
          <Card style={{ minWidth: 350, maxWidth: 500 }}>
            <MDBox p={3}>
              <MDTypography variant="h4" textAlign="center">
                Home
              </MDTypography>
            </MDBox>

            <MDBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput label="Receiver" InputProps={{ style: { width: 300 } }} />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <Select
                    value={selectedBank}
                    onChange={handleChange}
                    placeholder="Bank"
                    style={{ width: 300, height: 44 }}
                  >
                    <MenuItem value={"bank"} disabled>
                      Bank
                    </MenuItem>
                    {Banks.map((bank) => (
                      <MenuItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput label="Amount" InputProps={{ style: { width: 300 } }} />
                </Grid>
              </Grid>
            </MDBox>

            <MDBox pt={2} pb={5} display="flex" justifyContent="center">
              <Grid container spacing={3} maxWidth={300}>
                <Grid item xs={6}>
                  <MDButton
                    fullWidth
                    variant="gradient"
                    color="dark"
                    size="medium"
                    onClick={() => navigate("/transactions")}
                  >
                    Payment
                  </MDButton>
                </Grid>
                <Grid item xs={6}>
                  <MDButton
                    fullWidth
                    variant="gradient"
                    color="dark"
                    size="medium"
                    onClick={handleLaunchBank}
                  >
                    Launch
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Home;
