import { Card, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Currency = [
  {
    label: "MYR",
    value: "myr",
  },
  {
    label: "THB",
    value: "thb",
  },
  {
    label: "VND",
    value: "vnd",
  },
  {
    label: "IDR",
    value: "idr",
  },
  {
    label: "INR",
    value: "inr",
  },
  {
    label: "KRW",
    value: "krw",
  },
  {
    label: "JPN",
    value: "jpn",
  },
  {
    label: "SGD",
    value: "sgd",
  },
  {
    label: "MMK",
    value: "mmk",
  },
];

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
  const [selectedCurrency, setSelectedCurrency] = useState("currency");
  const [currentDateTime, setCurrentDateTime] = useState("");

  const handleBankChange = (event: SelectChangeEvent<string>) => {
    setSelectedBank(event.target.value);
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLaunchBank = () => {
    if (selectedBank === "bank") return;
    navigate(`/bank/${selectedBank}`);
  };

  useEffect(() => {
    const nowdate = new Date();
    const formattedDateTime = nowdate.toISOString();
    setCurrentDateTime(formattedDateTime);
  }, []);

  return (
    <DashboardLayout>
      <Grid container justifyContent="center">
        <Grid item display="flex" justifyContent="center" lg={12} xl={8}>
          <Card style={{ minWidth: 350, maxWidth: 500 }}>
            <MDBox p={3}>
              <MDTypography variant="h6" textAlign="left">
                Now:{currentDateTime}
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <MDTypography variant="h4" textAlign="center">
                Home
              </MDTypography>
            </MDBox>

            <MDBox component="form" pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput label="Merchant Code" InputProps={{ style: { width: 300 } }} />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput label="Key" InputProps={{ style: { width: 300 } }} />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput label="Transaction ID" InputProps={{ style: { width: 300 } }} />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <Select
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    placeholder="Currency"
                    style={{ width: 300, height: 44 }}
                  >
                    <MenuItem value={"currency"} disabled>
                      Currency
                    </MenuItem>
                    {Currency.map((currency) => (
                      <MenuItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <Select
                    value={selectedBank}
                    onChange={handleBankChange}
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
