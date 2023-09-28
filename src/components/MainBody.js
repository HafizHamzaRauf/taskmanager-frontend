import { Box, Button, Typography } from "@mui/material";
import React from "react";
import theme from "../theme";
import CardList from "./CardList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainBody = () => {
  const boards = useSelector((state) => state.auth.user.boards);
  const board = useSelector((state) => state.board);
  const navigate = useNavigate();
  // Find the current board by its ID
  const currentBoard = boards?.find(
    (b) => b?._id?.toString() === board?.currentBoardId?.toString()
  );

  if (!currentBoard || !board.show) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            p: "2rem",
          }}
        >
          There is no board to display here.
        </Typography>
      </Box>
    );
  }

  // Extract tasks from the current board
  const { tasks } = currentBoard;
  // Filter tasks based on status
  const todoTasks = tasks.filter(
    (task) => task?.status?.trim().toLowerCase() === "todo"
  );
  const doingTasks = tasks.filter(
    (task) => task?.status?.trim().toLowerCase() === "doing"
  );
  const doneTasks = tasks.filter(
    (task) => task?.status?.trim().toLowerCase() === "done"
  );
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.tertiary,
        width: "100%",
        height: "100%",
        flexGrow: 1,
        p: "2rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: {
          lg: "row",
          xs: "column",
        },
        alignItems: {
          xs: "center",
          lg: "flex-start",
        },
        gap: "2rem",
      }}
    >
      <CardList
        heading={"Todo"}
        list={todoTasks} // Extract text property of tasks
        headingColor={"secondary"}
      ></CardList>
      <CardList
        heading={"Doing"}
        list={doingTasks} // Extract text property of tasks
        headingColor={"tertiary"}
      ></CardList>
      <CardList
        heading={"Done"}
        list={doneTasks} // Extract text property of tasks
        headingColor={"quaternary"}
      ></CardList>
    </Box>
  );
};

export default MainBody;
