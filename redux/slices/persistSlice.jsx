const { createSlice } = require("@reduxjs/toolkit");

const initialState = { token: null };
const persistSlice = createSlice({
  name: "persistInfos",
  initialState,
  reducers: {
    fetchPersistInfos: (state, action) => {
      let newState = { ...state };
      const { token } = action.payload;
      newState.token = token;
      return newState;
    },
  },
});

export const { fetchPersistInfos } = persistSlice.actions;
export default persistSlice.reducer;
