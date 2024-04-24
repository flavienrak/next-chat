import { createSlice } from "@reduxjs/toolkit";
const initialState = { users: [] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersInfos: (state, action) => {
      let newState = { ...state };
      const { users } = action.payload;
      newState.users = users;
      return newState;
    },
  },
});

export const { fetchUsersInfos } = usersSlice.actions;
export default usersSlice.reducer;
