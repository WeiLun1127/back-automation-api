import { Card, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import DashboardLayout from "assets/examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const Currency = [
  { label: "MYR", value: "MY" },
  { label: "THB", value: "TH" },
  { label: "VND", value: "VN" },
  { label: "IDR", value: "ID" },
  { label: "INR", value: "IN" },
  { label: "KRW", value: "KR" },
  { label: "JPN", value: "JP" },
  { label: "SGD", value: "SG" },
  { label: "MMK", value: "MM" },
];

const Banks = [
  { label: "Maybank", value: "mbb" },
  { label: "Hong Leong Bank", value: "hlb" },
  { label: "CIMB", value: "cimb" },
  { label: "Public Bank", value: "pbb" },
  { label: "RHB", value: "rhb" },
  { label: "BSN", value: "bsn" },
];

const Home = () => {
  const navigate = useNavigate();
  const [retryUrl, setretryUrl] = useState("https://retry.yahoo.com");
  const [exitUrl, setexitUrl] = useState("https://exit.yahoo.com/");
  const [callbackUrl, setcallbackUrl] = useState("https://callback.yahoo.com/");
  const [apiUrl, setapiUrl] = useState("http://18.138.168.43:10300/api/token/");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [merchantCode, setMerchantCode] = useState("MMY090");
  const [key, setKey] = useState("Kjd+-0H8d0~n@bj8");
  const [txnIdx, setTxnIdx] = useState("");
  const [selectedBank, setSelectedBank] = useState("bank");
  const [selectedCurrency, setSelectedCurrency] = useState("currency");
  const [amount, setAmount] = useState("10");
  const [encData, setEncData] = useState("");
  const [jsonData, setJsonData] = useState("");

  const handleBankChange = (event: SelectChangeEvent<string>) => {
    setSelectedBank(event.target.value);
  };

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
  };

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
      UrlExit: exitUrl,
      UrlRetry: retryUrl,
      UrlCallback: callbackUrl,
      TxnIdx: txnIdx,
      Currency: selectedCurrency,
      Bank: selectedBank,
      Amount: amount,
    };
    localStorage.setItem("exitURL:", data.UrlExit);
    localStorage.setItem("retryURL:", data.UrlRetry);
    localStorage.setItem("callbackURL:", data.UrlCallback);

    try {
      const encryptedData = await Encrypt(key, JSON.stringify(data));
      setEncData(encryptedData);

      localStorage.setItem("encryptedData", encryptedData);

      const proceedData = JSON.stringify({
        MerchantCode: merchantCode,
        Code: encryptedData,
      });

      setJsonData(proceedData);
      localStorage.setItem("jsonData", proceedData);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: proceedData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const encodeURL = encodeURIComponent(result.Token);

      localStorage.setItem("token", result.Token);
      console.log("Success:", result);
      console.log("data.Url:", result.Url);
      // navigate(`/bank/${selectedBank}`);
      navigate(`/bank/${selectedBank}?token=${encodeURL}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const nowdate = new Date();
    const formattedDateTime = nowdate.toISOString();
    setCurrentDateTime(formattedDateTime);
    setTxnIdx("IDX" + getRandomInteger(700000, 999999));

    // const savedJsonData = localStorage.getItem("jsonData");
    // if (savedJsonData) {
    //   setJsonData(savedJsonData);
    // }
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
            <MDBox p={2}>
              <MDTypography variant="h6" textAlign="left">
                Now:{currentDateTime}
              </MDTypography>
            </MDBox>
            <MDBox p={2}>
              <MDTypography variant="h4" textAlign="center">
                Home
              </MDTypography>
            </MDBox>

            <MDBox component="form" pb={3} px={3}>
              <Grid container spacing={2}>
                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="Retry URL"
                    value={retryUrl}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setretryUrl(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="Exit URL"
                    value={exitUrl}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setexitUrl(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="CallBack URL"
                    value={callbackUrl}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setcallbackUrl(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

                <Grid item display="flex" justifyContent="center" xs={12}>
                  <MDInput
                    label="API URL"
                    value={apiUrl}
                    onChange={(e: { target: { value: SetStateAction<string> } }) =>
                      setapiUrl(e.target.value)
                    }
                    InputProps={{ style: { width: 300 } }}
                  />
                </Grid>

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
              <Grid container spacing={2} maxWidth={200}>
                {/* <Grid item xs={6}>
                  <MDButton
                    fullWidth
                    variant="gradient"
                    color="dark"
                    size="medium"
                    onClick={() => navigate("/transactions")}
                  >
                    Payment
                  </MDButton>
                </Grid> */}
                <Grid item xs={15}>
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
