import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AccountHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toHome = () => {
    navigate("/Home");
  };

  const toMyAccount = () => {
    navigate("/MyAccount");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "primary.main" }}>
      <AppBar position="static">
        <Toolbar>
          {location.pathname !== "/MyAccount" ? (
            <Button
              sx={{ ":hover": { bgcolor: "black" }, bgcolor: "white" }}
              onClick={toMyAccount}
            >
              <ArrowBackIcon />
            </Button>
          ) : (
            ""
          )}

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
            My Account
          </Typography>
          <Button variant="h6" component="div" onClick={toHome}>
            Go Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AccountHeader;
