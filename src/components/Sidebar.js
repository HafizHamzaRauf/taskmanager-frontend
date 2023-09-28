import { Box } from "@mui/material";
import React from "react";
import theme from "../theme";
import Logo from "./Logo";
import Boards from "./Boards";
const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    width: "17%",
    overflowY: "auto",
    color: theme.palette.text.primary,
    "&::-webkit-scrollbar": {
      width: "4px", // Adjust the width as needed
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent", // Background color of the scrollbar track
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main, // Color of the scrollbar thumb
      borderRadius: "4px", // Rounded corners of the scrollbar thumb
    },
  },
};
const Sidebar = () => {
  return (
    <Box sx={{ ...styles.sidebar, borderRight: "1px solid black" }}>
      <Logo></Logo>
      <Boards></Boards>
    </Box>
  );
};

export default Sidebar;
