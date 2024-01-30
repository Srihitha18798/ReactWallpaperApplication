import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FavoriteHeader = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/Home");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "primary.main" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Favorites
          </Typography>
          <Button variant="h6" component="div" onClick={toHome}>
            Go Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default FavoriteHeader;
