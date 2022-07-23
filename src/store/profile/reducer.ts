import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { loadCurrentUser, register, signin, signout } from './actions';
type User = {
  id?: string;
  fullName: string;
  email: string;
  createdAt?: string;
  password?: string;
};
type ProfileState = {
  user: User | null;
  token?: string | null;
  loading: boolean;
  error: string | null;
};
const initialState: ProfileState = {
  user: null,
  token: null,
  loading: false,
  error: null
};
const reducer = createReducer(initialState, builder => {
  builder

    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    })
    .addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    })

    .addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(signout.fulfilled, state => {
      state.user = null;
      state.loading = false;
    })
    .addMatcher(
      isAnyOf(
        signin.pending,
        signout.pending,
        register.pending,
        loadCurrentUser.pending
      ),
      state => {
        state.loading = true;
        state.error = null;
      }
    )
    .addMatcher(
      isAnyOf(
        signin.rejected,
        signout.rejected,
        register.rejected,
        loadCurrentUser.rejected
      ),
      (state, action: any) => {
        state.user = null;
        state.error = action.payload;
      }
    );
});
export { reducer };
