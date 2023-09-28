import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DropdownButton = ({ options, onOptionChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    onOptionChange(option); // Call the callback to update the selected option
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ArrowDropDownIcon
          sx={{ color: "white", width: "3rem", height: "3rem" }}
        />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ width: "200px", height: "200px" }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownButton;
