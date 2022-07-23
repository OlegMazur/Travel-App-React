import { configureStore } from '@reduxjs/toolkit';
import { bookingsReducer, profileReducer, tripsReducer } from './root-reducer';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    trips: tripsReducer,
    bookings: bookingsReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
