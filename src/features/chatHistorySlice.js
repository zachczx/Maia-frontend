import { createSlice } from '@reduxjs/toolkit'

export const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState: {
    messages: [],
    timestamp: "",
  },
  reducers: {
    addMessage: (state, action) => {
      console.log('Adding message:', action.payload);
      state.messages.push(action.payload);
    },
    clearHistory: (state) => {
      state.messages = []
      state.timestamp = ""
    },
    addTimeStamp: (state, action) => {
        state.timestamp = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { addMessage, clearHistory, addTimeStamp } = chatHistorySlice.actions

export default chatHistorySlice.reducer