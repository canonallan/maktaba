import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Listing } from '../../types';

interface ListingState {
  listings: Listing[];
  currentListing: Listing | null;
  loading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null
};

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (params: { category?: string; condition?: string; search?: string }) => {
    const response = await api.get('/listings', { params });
    return response.data;
  }
);

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (listingData: Partial<Listing>) => {
    const response = await api.post('/listings', listingData);
    return response.data;
  }
);

const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setCurrentListing: (state, action) => {
      state.currentListing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch listings';
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.listings.unshift(action.payload);
      });
  }
});

export const { setCurrentListing } = listingSlice.actions;
export default listingSlice.reducer;