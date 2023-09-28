import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardId, showBoard } from "../store/board";
import { BACKEND_URL, addBoard } from "../store/authSlice";
import theme from "../theme";
import { updateStorage } from "../store/persist";
import { useNavigate } from "react-router-dom";
const AddBoardForm = ({ onClose, handleItemClick, ReturnToDashboard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const boards = useSelector((state) => state.auth.user.boards);
  const user = useSelector((state) => state.auth.user);
  const handleSubmit = async () => {
    if (boardName.trim() !== "") {
      const newBoard = {
        boardName,
        username: user.username,
      };

      try {
        const response = await fetch(`${BACKEND_URL}addBoard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBoard),
        });
        if (response.ok) {
          // Board added successfully, you can handle the response as needed
          const data = await response.json();
          const updatingBoard = {
            _id: data.board._id,
            name: data.board.name,
            tasks: [],
          };

          const temp = {
            user: { ...user, boards: [...boards, updatingBoard] },
            board: { show: true, currentBoardId: data.board._id },
          };
          updateStorage(temp);
          dispatch(addBoard(updatingBoard));
          if (!isLgScreen) {
            dispatch(showBoard());
            dispatch(setCurrentBoardId(data.board._id)); // Use the ID returned from the server
          } else {
            handleItemClick(data.board._id, boards.length, true);
          }

          // Clear the input field
          setBoardName("");

          // Hide the form using the onClose callback
          if (ReturnToDashboard) {
            navigate("/dashboard");
          }
          onClose();
        } else {
          // Handle error response from the server
          console.error("Error adding board:", response);
        }
      } catch (error) {
        console.error("An error occurred while adding the board:", error);
      }
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
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "2rem",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Board Name"
          variant="outlined" // Add variant property
          fullWidth // Allow the TextField to take full width
          autoFocus // Automatically focus on the input field
        />

        <Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Board
          </Button>
          <Button
            variant="outline"
            color="primary"
            onClick={() => {
              if (ReturnToDashboard) {
                navigate("/dashboard");
              } else {
                onClose();
              }
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBoardForm;
