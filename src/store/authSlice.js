import { createSlice } from "@reduxjs/toolkit";
export const BACKEND_URL = "https://combative-cap-colt.cyclic.cloud/";
const initialState = {
  user: {
    id: "",
    token: "",

    username: "",
    boards: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startingState(state, action) {
      state.user = action.payload;
    },
    addBoard(state, action) {
      state.user.boards.push(action.payload);
    },
    addTaskByBoardId(state, action) {
      const index = state.user.boards.findIndex(
        (a) => a._id.toString() === action.payload.boardId
      );
      if (index === -1) {
        console.log('board didn"t found');
      }
      state.user.boards[index].tasks.push(action.payload.newTask);
    },
    updateTaskById(state, action) {
      const { boardId, taskId, updatedTask } = action.payload;

      // Find the board by ID
      const board = state.user.boards.findIndex(
        (board) => board._id === boardId
      );
      if (board === -1) {
        console.error(`Board with ID ${boardId} not found.`);
        return;
      }

      // Find the task by ID
      const task = state.user.boards[board]?.tasks.findIndex(
        (task) => task._id === taskId
      );
      if (task === -1) {
        console.error(`Task with ID ${taskId} not found.`);
        return;
      }

      state.user.boards[board].tasks[task] = updatedTask;
    },
    deleteTaskById(state, action) {
      const { taskId, boardId } = action.payload;
      const boardIndex = state?.user?.boards?.findIndex(
        (a) => a?._id?.toString() === boardId.toString()
      );
      state.user.boards[boardIndex].tasks = state.user.boards[
        boardIndex
      ].tasks.filter((a) => a._id.toString() !== taskId.toString());
    },
    addUserInfo(state, action) {
      state.user.username = action.payload.username;
      state.user.id = action.payload.id;
      state.user.token = action.payload.token;

      state.user.boards = action.payload.boards;
    },
    logout(state, action) {
      state.user = initialState;
    },
  },
});

export const {
  addUserInfo,
  logout,
  updateTaskById,
  addBoard,
  addTaskByBoardId,
  deleteTaskById,
  startingState,
} = authSlice.actions;
export default authSlice.reducer;
