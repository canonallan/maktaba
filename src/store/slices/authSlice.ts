// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { User } from '../../types';

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ user: User; token: string }>
//     ) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
// export default authSlice.reducer;

// store/slices/authSlice.ts


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   user: any | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
//   token: localStorage.getItem('token')
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       // Store in localStorage
//       localStorage.setItem('user', JSON.stringify(action.payload.user));
//       localStorage.setItem('token', action.payload.token);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       // Remove from localStorage
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//     }
//   }
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Retrieve the token from localStorage on app initialization
const tokenFromStorage = localStorage.getItem('token');

const initialState: AuthState = {
  user: null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials and save token to localStorage
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save token to localStorage
      localStorage.setItem('token', action.payload.token);
    },

    // Logout user and clear token from localStorage
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from localStorage
      localStorage.removeItem('token');
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions for use in components
export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

// Export the reducer for the store
export default authSlice.reducer;
