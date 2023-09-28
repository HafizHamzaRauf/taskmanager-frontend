import { Box, Button, Hidden, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../theme";
import ThreeDotsMenu from "./ThreeDotsMenu";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import DropdownButton from "./DropdownButton";
import TaskFormOverlay from "./TaskFormOverlay";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardId, showBoard as ShowBoardFunc } from "../store/board";
import { updateStorage } from "../store/persist";

const Navigation = () => {
  const dispatch = useDispatch();
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  const state = useSelector((state) => state.board);
  const { show: showBoard, currentBoardId } = useSelector(
    (state) => state.board
  );

  const { username, boards } = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);

  const curBoard = boards?.find(
    (a) => a?._id?.toString() === currentBoardId?.toString()
  );

  const handleOpenTaskForm = () => {
    setTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setTaskFormOpen(false);
  };

  const mobileChangingOption = (e) => {
    updateStorage({ user, board: { show: true, currentBoardId: e.key } });
    dispatch(ShowBoardFunc());
    dispatch(setCurrentBoardId(e.key));
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
        p: "3rem 2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <AlignVerticalBottomIcon
          sx={{
            width: "30px",
            height: "30px",
            display: {
              xs: "block",
              lg: "none",
            },
            color: theme.palette.secondary.main,
          }}
        ></AlignVerticalBottomIcon>
        <Hidden lgUp>
          {/* Conditionally render on xs to md screens */}
          <Typography component={"h4"} variant="h5" sx={{ color: "white" }}>
            {showBoard ? curBoard?.name : username}
          </Typography>
        </Hidden>
        <Hidden lgDown>
          {/* Conditionally render on lg and xl screens */}
          <Typography component={"h3"} sx={{ color: "white" }} variant="h4">
            {showBoard ? curBoard?.name : username + "'s Dashboard"}
          </Typography>
        </Hidden>
        <Hidden lgUp>
          <DropdownButton
            options={boards.map((board) => (
              <option key={board._id} value={board._id}>
                {board.name}
              </option>
            ))}
            onOptionChange={mobileChangingOption}
          />
        </Hidden>
      </Box>
      <Box sx={{ display: "flex" }}>
        {showBoard && (
          <Button
            onClick={handleOpenTaskForm}
            sx={{
              borderRadius: "2rem",
              fontSize: {
                xs: "2rem",
                lg: "1.2rem",
              },
              "&:hover": {
                backgroundColor: "black",
              },
              color: "white",
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <Hidden lgUp>+</Hidden>
            <Hidden lgDown>+ Add New Task</Hidden>
          </Button>
        )}
        <ThreeDotsMenu></ThreeDotsMenu>
        {isTaskFormOpen && <TaskFormOverlay onClose={handleCloseTaskForm} />}
      </Box>
    </Box>
  );
};

export default Navigation;
