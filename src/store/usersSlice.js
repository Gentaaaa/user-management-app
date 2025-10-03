import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload; // vendos gjithë users
    },
    addUser: (state, action) => {
      if (!state.some(u => u.id === action.payload.id)) {
        state.unshift(action.payload);
      }
    },
    updateUser: (state, action) => {
      const index = state.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action) => state.filter(u => u.id !== action.payload),
  },
});

export const { addUser, updateUser, deleteUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
