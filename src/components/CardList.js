import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import Card from "./Card";

const CardList = ({ headingColor, heading, list }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        gap: "2rem",
        alignSelf: {
          lg: "flex-start",
          xs: "center",
        },
      }}
    >
      <Typography
        component={"h6"}
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Badge variant="dot" color={headingColor}></Badge>
        {heading}({list.length})
      </Typography>
      {list.length === 0 && (
        <Typography
          component={"h4"}
          sx={{
            width: {
              xs: "30rem",
              md: "60rem",
              lg: "30rem",
            },
          }}
          variant="h4"
        >
          Empty
        </Typography>
      )}
      {list.map((a, index) => {
        return <Card key={index} task={a}></Card>;
      })}
    </Box>
  );
};

export default CardList;
