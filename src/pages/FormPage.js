import React from "react";
import Hero from "../components/Hero";
import theme from "../theme";
import { Box } from "@mui/material";
import HeroNav from "../components/HeroNav";
import Form from "../components/Form";

const styles = {
  heroBody: {
    backgroundColor: theme.palette.primary.main,

    width: "100vw",
    height: "100vh",
  },
};
const FormPage = () => {
  return (
    <Box sx={styles.heroBody}>
      <HeroNav></HeroNav>
      <Form></Form>
    </Box>
  );
};

export default FormPage;
