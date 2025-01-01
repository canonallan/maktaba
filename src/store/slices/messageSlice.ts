import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Message } from '../../types';

interface MessageState {
  conversations: any[];
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  conversations: [],
  messages: [],
  loading: false,
  error: null
};

export const fetchConversations = createAsyncThunk(
  'messages/fetchConversations',
  async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (userId: string) => {
    const response = await api.get(`/messages/${userId}`);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageData: { receiverId: string; content: string; listingId?: string }) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  }
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;