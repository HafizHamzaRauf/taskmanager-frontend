import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../theme";
import Task from "./Task";

const Card = ({ task }) => {
  const [showTaskDescription, setShowTaskDescription] = useState(false);
  const [taskId, setTaskId] = useState("");
  const showTaskDescriptionHandler = (id) => {
    setTaskId(id);
    setShowTaskDescription(true);
  };
  const closeTaskDescriptionHandler = () => {
    setTaskId("");
    setShowTaskDescription(false);
  };
  const doneSubtaskCount = task.subTasks.reduce((count, subtask) => {
    if (subtask.done) {
      return count + 1;
    }
    return count;
  }, 0);
  return (
    <>
      {showTaskDescription && (
        <Task onClose={closeTaskDescriptionHandler} taskId={taskId}></Task>
      )}
      <Box
        key={task._id}
        sx={{
          backgroundColor: theme.palette.primary.main,
          p: "2rem",
          borderRadius: "1rem",
          width: {
            xs: "30rem",
            md: "60rem",
            lg: "30rem",
          },
          display: "flex",
          alignItems: "flexStart",
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "black",
            cursor: "pointer",
          },
        }}
        onClick={() => showTaskDescriptionHandler(task._id)}
      >
        <Typography component={"h5"} variant="h5">
          {task.heading}
        </Typography>
        <Typography
          component={"h6"}
          variant="h6"
          sx={{ color: theme.palette.text.secondary }}
        >
          {doneSubtaskCount} of {task.subTasks?.length} subtasks
        </Typography>
      </Box>
    </>
  );
};

export default Card;
