import { createSlice } from "@reduxjs/toolkit";
const initialState = { messages: [] };

const messagesSclice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    fetchMessagesInfos: (state, action) => {
      let newState = { ...state };
      const { messages } = action.payload;
      newState.messages = messages;
      return newState;
    },
  },
});

export const { fetchMessagesInfos } = messagesSclice.actions;
export default messagesSclice.reducer;
