import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { Grid } from "@mui/material";
import { firstLoad } from "../store/persist";
import { useDispatch, useSelector } from "react-redux";
import { startingState } from "../store/authSlice";
import { startingState as startingStateBoard } from "../store/board";
import { useNavigate } from "react-router-dom";
const MainPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const data = firstLoad();
    if (!data.user.token) {
      navigate("/login");
    }
    setFirstRender(false);
    dispatch(startingState(data.user));

    dispatch(startingStateBoard(data.board));
  }, []);

  if (firstRender) return <></>;

  return (
    <Grid container>
      {children}
      <Grid
        item
        md={2}
        sx={{
          display: {
            lg: "block",
            xs: "none",
          },
        }}
      >
        <Sidebar></Sidebar>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Main></Main>
      </Grid>
    </Grid>
  );
};

export default MainPage;
