import React, { useState } from "react";
import { Hidden, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { reset } from "../store/board";
import { updateStorage } from "../store/persist";

const ThreeDotsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandle = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(logout());
    dispatch(reset());
    updateStorage(null);
    navigate("/login");
  };
  const addboardHandler = () => {
    navigate("/dashboard/addBoard");
  };

  return (
    <div>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        sx={{ color: "grey" }}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ width: "3rem", height: "3rem" }} />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={menuHandle}
      >
        <Hidden lgUp>
          <MenuItem onClick={addboardHandler}>Add Board</MenuItem>
        </Hidden>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ThreeDotsMenu;
