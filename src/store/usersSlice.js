import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {
    setUsers: (state, action) => { state.users = action.payload; },
    updateUser: (state, action) => {
      state.users = state.users.map(u => u.id === action.payload.id ? action.payload : u);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  }
});

export const { setUsers, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
