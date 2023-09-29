import React, { useState } from "react";
import Hero from "../components/Hero";
import theme from "../theme";
import { Box } from "@mui/material";
import HeroNav from "../components/HeroNav";
import Form from "../components/Form";

const styles = {
  heroBody: {
    backgroundColor: theme.palette.primary.main,

    width: "100vw",
    height: "100vh",
  },
};
const FormPage = () => {
  const isLoginRoute = window.location.pathname === "/login";

  const [isLogin, setIsLogin] = useState(isLoginRoute);
  const loginModifier = (value) => {
    setIsLogin(value);
  };
  return (
    <Box sx={styles.heroBody}>
      <HeroNav setIsLogin={loginModifier}></HeroNav>
      <Form setIsLogin={loginModifier} isLogin={isLogin}></Form>
    </Box>
  );
};

export default FormPage;
