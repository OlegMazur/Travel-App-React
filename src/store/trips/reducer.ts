import { ITripCard } from './../../common/interfaces/itripcard';
import { createReducer } from '@reduxjs/toolkit';
import { getTripById, getTrips } from './actions';
type TripsState = {
  trips: ITripCard[] | [];
  loading: boolean;
  trip: ITripCard | null;
  error: string | null;
};

const initialState: TripsState = {
  trips: [],
  trip: null,
  loading: false,
  error: null
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(getTrips.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getTrips.fulfilled, (state, action) => {
      state.trips = action.payload;

      state.loading = false;
    })
    .addCase(getTripById.fulfilled, (state, action) => {
      state.trip = action.payload;
    });
});
export { reducer };
