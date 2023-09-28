import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL, addTaskByBoardId } from "../store/authSlice";
import { updateStorage } from "../store/persist";

const TaskFormOverlay = ({ onClose, onAddTask }) => {
  const [taskHeading, setTaskHeading] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtask, setSubtask] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [status, setStatus] = useState("todo");
  const boardState = useSelector((state) => state.board);
  const user = useSelector((state) => state.auth.user);
  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();
  const handleAddSubtask = () => {
    if (subtask.trim() !== "") {
      const newSubTask = {
        name: subtask,
        done: false,
      };
      setSubtasks([newSubTask, ...subtasks]);
      setSubtask("");
    }
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];

    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleAddTask = async () => {
    const newTask = {
      heading: taskHeading,
      description: taskDescription,
      status,
      subTasks: subtasks,
    };

    const requestBody = {
      boardId: boardState.currentBoardId,
      newTask: newTask,
      username,
    };

    try {
      const response = await fetch(`${BACKEND_URL}addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        // Task added successfully, you can handle the response here if needed

        const currentBoardIndex = user.boards?.findIndex(
          (a) => a._id.toString() === boardState.currentBoardId.toString()
        );
        const newTaskList = [
          ...user.boards[currentBoardIndex].tasks,
          data.task,
        ];
        const copyboards = user.boards.filter(
          (a) => a._id.toString() !== boardState.currentBoardId
        );

        updateStorage({
          user: {
            ...user,
            boards: [
              ...copyboards,
              { ...user.boards[currentBoardIndex], tasks: newTaskList },
            ],
          },
          board: boardState,
        });
        dispatch(
          addTaskByBoardId({
            boardId: boardState.currentBoardId,
            newTask: data.task,
          })
        );
      } else {
        // Handle error response here

        console.error("Failed to add task");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }

    setTaskHeading("");
    setTaskDescription("");
    setSubtasks([]);
    setStatus("todo");

    // Close the overlay
    onClose();
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
          width: "80%",
          maxWidth: "400px",
          backgroundColor: "#2D2D38",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Typography sx={{ color: "white" }} variant="h5" gutterBottom>
          Create Task
        </Typography>
        <TextField
          label="Task Heading"
          sx={{ color: "white" }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={taskHeading}
          onChange={(e) => setTaskHeading(e.target.value)}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
        />
        <TextField
          label="Task Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={taskDescription}
          InputProps={{
            style: {
              color: "white",

              borderColor: "white",
            },
          }}
          onChange={(e) => setTaskDescription(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Typography variant="subtitle1" gutterBottom sx={{ color: "white" }}>
          Subtasks:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Subtask"
            variant="outlined"
            margin="normal"
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddSubtask}
            sx={{ ml: 2 }}
          >
            Add Subtask
          </Button>
        </Box>
        <ul
          style={{ listStyleType: "none", height: "100px", overflow: "auto" }}
        >
          {subtasks.map((sub, index) => (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                color: "white",
              }}
              key={index}
            >
              {sub.name}
              <CloseIcon
                onClick={() => handleRemoveSubtask(index)}
                sx={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel sx={{ color: "white" }}>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            sx={{ color: "white" }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="doing">Doing</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddTask}
          sx={{ mt: 2 }}
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ mt: 2, ml: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default TaskFormOverlay;
