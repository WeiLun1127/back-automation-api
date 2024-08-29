import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
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
  let ws: WebSocket | null = null;
  let retryStage = 0;
  let intervalId: NodeJS.Timeout | null = null;

  const onErrorFound = (errorMsg: string, url: string) => {
    setMessage(errorMsg);
    setLoading(false);
  };

  const onSucceed = (successMessage: string) => {
    setMessage(successMessage);
    setProgress(100);
    setLoading(false);
    console.log("Operation succeeded:", successMessage);
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
              setDisplay("raw: " + codedata[1]);
              const messageData = JSON.parse(decodeURIComponent(codedata[1]));
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
                onSucceed("Thank you");
              }
            } else {
              setDisplay("code: " + data.Data);
            }
            break;

          case "message":
            setMessage(`Server: ${data.Data}`);
            break;
          case "wait":
            const waitTime = parseInt(data.Data);
            retryStage = 1;
            console.log(`[retrystage: ${retryStage}]`);
            startCountdown(waitTime);
            break;
          default:
            setMessage("Unknown message received");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setMessage("WebSocket error occurred.");
        setLoading(false); // Stop loading on error
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <Box mt={2} textAlign="center">
        <Typography variant="h4" color="textPrimary">
          {message}
        </Typography>
        <Box mt={1}></Box>
        <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: "0.85rem" }}>
          RCID : {rcid}
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
