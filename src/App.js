import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import FormPage from "./pages/FormPage";
import MainPage from "./pages/MainPage";
import AddBoardPage from "./pages/AddBoardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPage></HeroPage>}></Route>
        <Route path="/login" element={<FormPage></FormPage>}></Route>
        <Route path="/signup" element={<FormPage></FormPage>}></Route>
        <Route path="/dashboard" element={<MainPage></MainPage>}></Route>
        <Route
          path="/dashboard/addBoard"
          element={<AddBoardPage></AddBoardPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
