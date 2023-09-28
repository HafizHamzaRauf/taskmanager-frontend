import { Box, Button } from "@mui/material";
import React from "react";
import theme from "../theme";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
const styles = {
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: "2rem 4rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "2rem",
    color: "white",
  },
  navbtns: { display: "flex", gap: "2rem", alignItems: "center" },
  btn: {
    fontSize: "1.5rem",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor: "aliceblue",
      color: "black",
    },
    display: {
      xs: "none",
      sm: "block",
    },
  },
};
const HeroNav = () => {
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    navigate("/signup");
    // Reload the current web page
    window.location.reload();
  };
  const loginLinkHandler = () => {
    navigate("/login");
    window.location.reload();
  };
  return (
    <Box sx={styles.navigation}>
      <Logo></Logo>
      <Box sx={styles.navbtns}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/login" style={styles.link} onClick={loginLinkHandler}>
          Login
        </Link>

        <Button onClick={signUpHandler} sx={styles.btn} variant="outlined">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default HeroNav;
