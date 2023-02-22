import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styles } from "constants/styles";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h1" style={{ color: styles.theme.primaryColor }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: styles.theme.primaryColor }}>
        Page Not Found
      </Typography>
      <Button sx={{ mt: 5 }} variant="contained" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
