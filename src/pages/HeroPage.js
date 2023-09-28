import React from "react";
import Hero from "../components/Hero";
import theme from "../theme";
import { Box } from "@mui/material";
import HeroNav from "../components/HeroNav";

const styles = {
  heroBody: {
    backgroundColor: theme.palette.primary.main,

    width: "100vw",
    height: "100vh",
  },
};
const HeroPage = () => {
  return (
    <Box sx={styles.heroBody}>
      <HeroNav></HeroNav>
      <Hero></Hero>
    </Box>
  );
};

export default HeroPage;
