import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
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
  const [color, setColor] = useState<string>("#ffffff");

  useEffect(() => {
    let ws: WebSocket;
    let retryStage = 0;
    let intervalId: NodeJS.Timeout | null = null;

    const connectWebSocket = (rcid: string) => {
      ws = new WebSocket("ws://18.138.168.43:9501/ws");

      ws.onopen = () => {
        console.log("WebSocket connection established");
        if (rcid) {
          ws.send(`attach^^${rcid}`);
        } else {
          ws.send("Start process");
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.ExeF) {
          case "initial":
            if (!rcid) {
              console.log(`event.data: ${event.data} jdata.ExeF: initial`);
              ws.send(`${data.Data}^^"EncryptedMessage`); //
            }
            break;
          case "codedigest":
            const [code, displayMessage] = data.Data.split("^^");
            console.log(`InProgress: event.data: ${event.data} jdata.ExeF: codedigest`);
            if (parseInt(code) >= 900) {
              setMessage("System error! Please try again shortly.");
              retryStage = 0;
            } else if (parseInt(code) >= 100 && parseInt(code) < 200) {
              setMessage("Thank you!");
              setProgress(100);
              setLoading(false); // Stop loading when progress is complete
            } else {
              setMessage(displayMessage || "Processing...");
            }
            break;
          case "statechanged":
            setMessage(`Server: ${data.Data}`);
            break;
          case "wait":
            const waitTime = parseInt(data.Data);
            retryStage = 1;
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
      <Box mt={2}>
        <Typography variant="h6" color="textSecondary">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
