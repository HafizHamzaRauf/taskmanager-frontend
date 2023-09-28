import {
  Box,
  Typography,
  Paper,
  Button,
  Tooltip,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BACKEND_URL,
  deleteTaskById,
  updateTaskById,
} from "../store/authSlice";
import { updateStorage } from "../store/persist";

const Task = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.auth.user.boards);
  const { currentBoardId } = useSelector((state) => state.board);
  const boardState = useSelector((state) => state.board);
  const username = useSelector((state) => state.auth.user.username);
  const user = useSelector((state) => state.auth.user);
  const currentBoard = boards.find(
    (a) => a?._id?.toString() === currentBoardId?.toString()
  );
  const [task, setTask] = useState(
    currentBoard.tasks.find((a) => a?._id?.toString() === taskId?.toString())
  );
  if (!task) {
    return null; // Task not found, return nothing
  }

  const doneSubtaskCount = task?.subTasks?.reduce((count, subtask) => {
    if (subtask?.done) {
      return count + 1;
    }
    return count;
  }, 0);

  function handleChange(e) {
    const updatedTask = { ...task, status: e.target.value };
    setTask(updatedTask); // Update the local state with the new status
  }
  function handleSubtaskChange(subtaskId) {
    const updatedSubtasks = task.subTasks.map((subtask) => {
      if (subtask._id === subtaskId) {
        // Toggle the 'done' property
        return { ...subtask, done: !subtask.done };
      }
      return subtask;
    });

    const updatedTask = { ...task, subTasks: updatedSubtasks };
    setTask(updatedTask);
  }

  async function handleSaveChanges() {
    try {
      const response = await fetch(`${BACKEND_URL}editTask`, {
        method: "put",
        body: JSON.stringify({ boardId: currentBoardId, task, username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("something went wrong", data);
      }

      const currentBoardIndex = user.boards?.findIndex(
        (a) => a._id.toString() === currentBoard._id.toString()
      );
      const currentTaskIndex = user.boards[currentBoardIndex].tasks.findIndex(
        (a) => a._id.toString() === task._id.toString()
      );

      const copyboards = user.boards.filter(
        (a) => a._id.toString() !== currentBoard._id.toString()
      );
      const copyTasks = user.boards[currentBoardIndex].tasks.filter(
        (a) => a._id.toString() !== task._id.toString()
      );
      updateStorage({
        user: {
          ...user,
          boards: [
            ...copyboards,
            { ...user.boards[currentBoardIndex], tasks: [...copyTasks, task] },
          ],
        },
        board: boardState,
      });
      dispatch(
        updateTaskById({
          boardId: currentBoardId,
          updatedTask: task,
          taskId,
        })
      );
    } catch (err) {
    } finally {
      onClose();
    }
  }
  const deleteTask = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}deleteTask`, {
        method: "delete",
        body: JSON.stringify({ boardId: currentBoardId, taskId, username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("something went wrong", data);
        return;
      }
      const copyBoards = boards.filter(
        (a) => a._id.toString() !== currentBoardId.toString()
      );
      updateStorage({
        board: boardState,
        user: {
          ...user,
          boards: [
            ...copyBoards,
            {
              ...currentBoard,
              tasks: currentBoard.tasks.filter(
                (a) => a._id.toString() !== taskId
              ),
            },
          ],
        },
      });
      dispatch(deleteTaskById({ boardId: currentBoardId, taskId }));
    } catch (err) {
    } finally {
      onClose();
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "500px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "3rem",
            position: "relative",
            borderRadius: "8px",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component={"h2"} variant="h2">
              {task.heading}
            </Typography>
            <Tooltip
              title="Delete Task"
              arrow
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <DeleteIcon onClick={deleteTask} />
            </Tooltip>
          </Box>
          <Typography
            sx={{ color: theme.palette.text.secondary }}
            component={"h6"}
            variant="h6"
          >
            {task.description}
          </Typography>
          <Typography component={"h5"} variant="h5">
            Subtasks ({doneSubtaskCount} of {task.subTasks?.length})
          </Typography>
          {task.subTasks?.map((subtask) => (
            <Box
              key={subtask._id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Checkbox
                checked={subtask.done}
                color="success"
                onChange={() => handleSubtaskChange(subtask._id)}
              />

              <Typography
                variant="body1"
                sx={{
                  color: subtask.done ? "grey" : "white",
                  textDecoration: subtask.done ? "line-through" : "none",
                  marginLeft: "0.5rem",
                }}
              >
                {subtask.name}
              </Typography>
            </Box>
          ))}
          <Typography component={"h6"} variant="h6">
            Status
          </Typography>
          <select
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
            value={task.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",

              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Task;
