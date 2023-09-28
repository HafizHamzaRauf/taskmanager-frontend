import { createSlice } from "@reduxjs/toolkit";

const initialState = { show: false, currentBoardId: "1" };

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    startingState(state, action) {
      state.show = action.payload.show;
      state.currentBoardId = action.payload.currentBoardId;
    },
    hideBoard(state) {
      state.show = false;
    },
    showBoard(state) {
      state.show = true;
    },
    setCurrentBoardId(state, action) {
      state.currentBoardId = action.payload.toString();
    },
    reset(state, action) {
      state.show = initialState.show;
      state.currentBoardId = initialState.currentBoardId;
    },
  },
});

export const { startingState, reset, showBoard, hideBoard, setCurrentBoardId } =
  boardSlice.actions;
export default boardSlice.reducer;
