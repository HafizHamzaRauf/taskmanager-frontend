import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import theme from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardId, showBoard } from "../store/board";
import AddBoardForm from "./AddBoardForm";
import { updateStorage } from "../store/persist";

const Boards = ({}) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(null);
  const boards = useSelector((state) => state.auth.user.boards);
  const [showBoardForm, setShowBoadForm] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const handleItemClick = (id, index, fromFormSubmission) => {
    if (!fromFormSubmission) {
      updateStorage({ user, board: { show: true, currentBoardId: id } });
    }
    // Set the active item when a ListItem is clicked
    dispatch(showBoard());
    dispatch(setCurrentBoardId(id));
    setActiveItem(index);
  };
  const addBoardClickHandler = () => {
    setShowBoadForm(true);
  };
  const onClose = () => {
    setShowBoadForm(false);
  };

  return (
    <Box>
      {showBoardForm && (
        <AddBoardForm
          handleItemClick={handleItemClick}
          onClose={onClose}
        ></AddBoardForm>
      )}
      <Typography
        sx={{ p: "0 2rem", color: theme.palette.text.secondary }}
        component={"h6"}
        variant="h6"
        color="grey"
      >
        All boards({boards.length})
      </Typography>

      <List sx={{ marginRight: "3rem" }}>
        {boards.map((a, index) => {
          const isItemActive = activeItem === index;
          return (
            <ListItem
              disablePadding
              key={a._id}
              sx={{
                color: isItemActive ? "white" : theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  borderTopRightRadius: "2.1rem",
                  borderBottomRightRadius: "2.1rem",
                },
              }}
              className={`${isItemActive ? "boardHover" : ""}`}
              onClick={() => handleItemClick(a._id, index)} // Handle click event
            >
              <ListItemButton sx={{ gap: "1rem" }}>
                <ContentPasteGoIcon sx={{ width: "3rem", height: "3rem" }} />

                <ListItemText primary={a.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          marginRight: "3rem",
          color: theme.palette.secondary.main,
          "&:hover": {
            borderTopRightRadius: "2.1rem",
            borderBottomRightRadius: "2.1rem",
          },
        }}
      >
        <ListItemButton sx={{ gap: "1rem" }} onClick={addBoardClickHandler}>
          <ContentPasteGoIcon sx={{ width: "3rem", height: "3rem" }} />

          <ListItemText primary={"+ Create New Board"} />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Boards;
