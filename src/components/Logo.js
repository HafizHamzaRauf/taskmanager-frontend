import { Box, Typography } from "@mui/material";
import React from "react";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import theme from "../theme";

const Logo = () => {
  return (
    <Box
      sx={{
        p: "4rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <AlignVerticalBottomIcon
        sx={{
          width: "30px",
          height: "30px",
          color: theme.palette.secondary.main,
        }}
      ></AlignVerticalBottomIcon>
      <Typography
        component={"h4"}
        variant="h4"
        sx={{
          color: "white",
        }}
      >
        TaskSwift
      </Typography>
    </Box>
  );
};

export default Logo;
