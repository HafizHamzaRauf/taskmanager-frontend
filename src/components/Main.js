import { Box, Flex } from "@mui/system";

import React from "react";
import Navigation from "./Navigation";
import MainBody from "./MainBody";

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
};

const Main = () => {
  return (
    <Box sx={{ ...styles.main }}>
      <Navigation />
      <MainBody />
    </Box>
  );
};

export default Main;
