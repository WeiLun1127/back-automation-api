import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const Progress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket("ws://18.138.168.43:9501/ws");

    ws.onopen = () => {
      console.log("WebSocket connection established");
      // Send any initial data if needed
      ws.send(JSON.stringify({ message: "Start process" }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      // Update progress based on the message received from the server
      if (message.progress) {
        setProgress(message.progress);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
    }, 800);

    return () => {
      clearInterval(timer);
      ws.close();
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
      <CircularProgress
        variant="determinate"
        value={progress}
        size={80}
        thickness={4}
        color="primary"
      />
      <Box mt={2}>
        <Typography variant="h6" color="textSecondary">
          Loading... {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
