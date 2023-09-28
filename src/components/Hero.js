import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../images/download.png";

const Hero = () => {
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    navigate("/signup");
    window.location.reload();
  };
  return (
    <Box
      sx={{
        color: "white",
        display: "flex",
        p: "4rem",
        marginTop: {
          sm: "10rem",
          xs: "5rem",
        },

        gap: "10rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography component={"h2"} variant="h2">
          Simplify Your Life Task Management Made Easy
        </Typography>
        <Typography
          component={"p"}
          variant="p"
          sx={{ color: "aliceblue", fontSize: "2rem" }}
        >
          Streamline your tasks, boost productivity, and conquer your goals with
          ease. Say hello to efficient task management.
        </Typography>

        <Button
          variant="contained"
          onClick={signUpHandler}
          sx={{
            backgroundColor: "#635FC5",
            fontSize: "1.5rem",
            alignSelf: "start",
          }}
        >
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <img src={heroImage} style={{ width: "40rem", height: "25rem" }} />
      </Box>
    </Box>
  );
};

export default Hero;
