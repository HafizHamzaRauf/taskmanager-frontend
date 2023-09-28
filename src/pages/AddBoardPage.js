import React, { useState } from "react";
import Main from "../components/Main";
import MainPage from "./MainPage";
import AddBoardForm from "../components/AddBoardForm";

const AddBoardPage = () => {
  const [showBoard, setShowBoard] = useState(true);
  const onCloseBoard = () => {
    setShowBoard(false);
  };
  return (
    <MainPage>
      {showBoard && (
        <AddBoardForm
          onClose={onCloseBoard}
          ReturnToDashboard={true}
        ></AddBoardForm>
      )}
    </MainPage>
  );
};

export default AddBoardPage;
