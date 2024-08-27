import { Card, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useState, useEffect, SetStateAction } from "react";
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
  const [merchantCode, setMerchantCode] = useState("MMY090");
  const [key, setKey] = useState("Kjd+-0H8d0~n@bj8");
  const [txnIdx, setTxnIdx] = useState("");
  const [amount, setAmount] = useState("10");
  const [encData, setEncData] = useState("");
  const [jsonData, setJsonData] = useState("");

  const handleBankChange = (event: SelectChangeEvent<string>) => {
    setSelectedBank(event.target.value);
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

  // const handleLaunchBank = () => {
  //   if (selectedBank === "bank") return;
  //   navigate(`/bank/${selectedBank}`);
  // };

  const handleLaunchBank = async () => {
    if (selectedBank === "bank") {
      alert("Please select a bank.");
      console.error("Please select a bank.");
      return;
    }

    if (selectedBank !== "mbb") {
      console.log("Data posting is only available for Maybank (mbb).");
      return;
    }

    const data = {
      TxnIdx: txnIdx,
      Currency: selectedCurrency,
      Bank: selectedBank,
      Amount: amount,
    };

    try {
      const encryptedData = await Encrypt(key, JSON.stringify(data));
      setEncData(encryptedData);

      // Construct the JSON string with MerchantCode and Code
      const formattedData = JSON.stringify({
        MerchantCode: merchantCode,
        Code: encryptedData,
      });

      setJsonData(formattedData);

      localStorage.setItem("jsonData", formattedData);

      const response = await fetch("https://18.138.168.43:10301/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MerchantCode: merchantCode,
          Code: encryptedData,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log(result);data
      console.log("Success:", result);
      navigate(`/bank/${selectedBank}${result.Url}?${result.Token}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const nowdate = new Date();
    const formattedDateTime = nowdate.toISOString();
    setCurrentDateTime(formattedDateTime);
    setTxnIdx("IDX" + getRandomInteger(700000, 999999));

    const savedJsonData = localStorage.getItem("jsonData");
    if (savedJsonData) {
      setJsonData(savedJsonData);
    }
  }, []);

  const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const Encrypt = async (key: string, plainText: string) => {
    const keyBytes = new TextEncoder().encode(key);
    if (keyBytes.length !== 16) {
      throw new Error("AES key must be 16 bytes long for AES-128");
    }
    const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC" }, false, [
      "encrypt",
    ]);
    const iv = new Uint8Array(16);
    const plainTextBytes = new TextEncoder().encode(plainText);
    const encryptedBytes = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      plainTextBytes
    );
    return btoa(String.fromCharCode(...new Uint8Array(encryptedBytes)));
  };

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
                  <MDInput
                    label="Merchant Code"
                    value={merchantCode}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setMerchantCode(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="Key"
                    value={key}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setKey(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="Transaction ID"
                    value={txnIdx}
                    InputProps={{ style: { width: 300 } }}
                    readOnly
                  />
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
                  <MDInput
                    label="Amount"
                    value={amount}
                    onChange={(e: { target: { value: string } }) => {
                      const value = e.target.value;
                      // Regular expression to allow only numbers with optional decimal places
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="Data"
                    value={jsonData}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setJsonData(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
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
