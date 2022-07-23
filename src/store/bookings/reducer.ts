import { createReducer } from '@reduxjs/toolkit';
import { IBookingCard } from '../../common/interfaces/ibookingcard';
import { createBook, deleteBook, getBookings } from './actions';
type TripsState = {
  bookingCard: IBookingCard[] | [];
  loading: boolean;
  error: string | null;
};

const initialState: TripsState = {
  bookingCard: [],
  loading: false,
  error: null
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(createBook.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createBook.fulfilled, (state, action) => {
      state.bookingCard = [...state.bookingCard, action.payload];
      state.loading = false;
    })
    .addCase(getBookings.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getBookings.fulfilled, (state, action) => {
      state.bookingCard = action.payload;
      state.loading = false;
    })
    .addCase(deleteBook.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteBook.fulfilled, (state, action) => {
      state.bookingCard = state.bookingCard.filter(
        item => item.id !== action.payload
      );
      state.loading = false;
    });
});
export { reducer };
