import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Card, Grid } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Progress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("In Progress...");
  const [loading, setLoading] = useState<boolean>(true);
  const [display, setDisplay] = useState("");
  const [color, setColor] = useState<string>("#ffffff");
  const [rcid, setRcid] = useState<string>("");
  const [rawData, setRawData] = useState<string>("");
  const [continueUrl, setContinueUrl] = useState<string>("");
  const [messageData, setMessageData] = useState<{ Message?: string }>({});
  let ws: WebSocket | null = null;
  let retryStage = 0;
  let intervalId: NodeJS.Timeout | null = null;

  const onErrorFound = (errorMsg: string, url: string) => {
    setMessage(errorMsg);
    setLoading(false);
    setContinueUrl(url);
  };

  const onSucceed = (successMessage: string, url: string) => {
    setMessage(successMessage);
    setProgress(100);
    setLoading(false);
    setContinueUrl(url);
  };

  useEffect(() => {
    const storedEncryptedData = localStorage.getItem("encryptedData");
    const token = localStorage.getItem("token") || "";
    const username = localStorage.getItem("username") || "";
    const password = localStorage.getItem("password") || "";

    const connectWebSocket = (rcid: string) => {
      ws = new WebSocket("ws://18.138.168.43:9501/ws");
      console.log("WebSocket is now connecting");

      ws.onopen = () => {
        console.log(`WebSocket is open now. [rcid: ${rcid}]`);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.ExeF) {
          case "initial":
            if (!rcid) {
              const cid = data.Data;
              console.log(`event.data: ${event.data} eventjdata.ExeF: initial`);
              setRcid(data.Data);
              console.log(`params.get('token'):${token}`);
              console.log("decodeURIComponent:", decodeURIComponent(token));
              ws.send(`${cid}^^start^=${token}^=${username}^=${password}`);
            } else {
              console.log("reconnecting:", "attach^^" + rcid);
              ws.send("attach^^" + rcid);
              retryStage = 3;
            }
            break;
          case "codedigest":
            let codedata = data.Data.split("^=");
            console.log(`event.data: ${event.data} eventjdata.ExeF: codedigest`);
            if (codedata.length === 2) {
              // setDisplay("RAW: " + codedata[1].toUpperCase());
              // setRawData(codedata[1]);
              // const messageData = JSON.parse(decodeURIComponent(codedata[1]));
              let messageData = JSON.parse(decodeURIComponent(codedata[1])); //Start
              delete messageData.URLEXIT;
              const modifiedRawData = JSON.stringify(messageData);

              setDisplay("RAW: " + modifiedRawData.toUpperCase());
              setRawData(modifiedRawData);
              setMessageData(messageData);

              let reactUrl = "javascript:window.close('','_parent','');";
              let showMessage = "System error! Please try again shortly";
              const code = parseInt(codedata[0], 0);

              if (messageData.UrlExit) {
                reactUrl = messageData.UrlExit;
              } else if (messageData.UrlRetry) {
                reactUrl = messageData.UrlRetry;
              }
              if (messageData.Message) {
                showMessage = messageData.Message;
              }

              console.log(
                "code: ",
                code,
                ", messageData.Message:",
                messageData.Message,
                ", messageData.UrlExit: ",
                messageData.UrlExit,
                ", messageData.UrlRetry:",
                messageData.UrlRetry
              );
              if (code >= 900) {
                onErrorFound(showMessage, reactUrl);
              } else if (code >= 100 && code < 200) {
                onSucceed("Thank you", reactUrl);
              }
            } else {
              setDisplay("code: " + data.Data);
            }
            break;

          case "message":
            setDisplay("");
            setDisplay(`Server: ${data.Data}`);
            console.log(`event.data: ${event.data} eventjdata.ExeF: message`);
            break;
          case "wait":
            const waitTime = parseInt(data.Data);
            retryStage = 1;
            console.log(`[retrystage: ${retryStage}]`);
            startCountdown(waitTime);
            break;
          default:
            setMessage("Unknown message received");
            setDisplay("Unknown message received");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setMessage("WebSocket error occurred.");
        setLoading(false);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        if (retryStage === 1) {
          retryStage = 2;
          console.log(`[retrystage: ${retryStage}]`);
          reconnectWebSocket(rcid);
        }
      };
    };

    const startCountdown = (waitTime: number) => {
      let countdown = waitTime;

      const countdownInterval = setInterval(() => {
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          setMessage("System error! Please try again shortly.");
          if (ws.readyState !== WebSocket.CLOSED) {
            ws.close();
          }
        } else {
          countdown -= 1000;
          setMessage(`Waiting... ${Math.floor(countdown / 1000)} seconds remaining`);
        }
      }, 1000);

      intervalId = countdownInterval;
    };

    const reconnectWebSocket = (rcid: string) => {
      if (retryStage === 2) {
        connectWebSocket(rcid);
      }
    };

    connectWebSocket("");

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (ws) ws.close();
    };
  }, []);

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <Grid item>
        <Card sx={{ maxWidth: 600, padding: 6 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="100%"
          >
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <Box mt={2}>
              <Typography variant="h2" color="textPrimary" sx={{ wordBreak: "break-word" }}>
                {messageData.Message ? messageData.Message.toUpperCase() : message.toUpperCase()}
              </Typography>
              <Box mt={1} />
              <Typography
                variant="subtitle2"
                color="blue"
                sx={{ fontSize: "1rem", wordBreak: "break-word" }}
              >
                RCID : {rcid}
              </Typography>
              {display && (
                <Box mt={1}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    sx={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      textAlign: "center",
                    }}
                  >
                    {display}
                  </Typography>
                  {continueUrl && (
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={continueUrl}
                        sx={{ mt: 2, color: "#ffffff" }}
                      >
                        Continue
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Progress;
