import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import boardReducer from "./board";

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
});

export { store };
