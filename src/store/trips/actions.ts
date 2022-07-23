import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPath, HttpMethod, StorageKey } from '../../common/enums/enums';
import { ITripCard } from '../../common/interfaces/itripcard';
import { storage } from '../../services/services';
import { ActionType } from './common';

const getTrips = createAsyncThunk<
  ITripCard[],
  undefined,
  { rejectValue: string }
>(ActionType.GET_TRIPS, async function (_, { rejectWithValue }) {
  const token = storage.getItem(StorageKey.TOKEN);
  const response = await fetch(apiPath.GET_TRIPS, {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: ITripCard[] = await response.json();

  return data;
});
const getTripById = createAsyncThunk<
  ITripCard,
  string,
  { rejectValue: string }
>(ActionType.GET_TRIP_BY_ID, async function (id, { rejectWithValue }) {
  const token = storage.getItem(StorageKey.TOKEN);
  const tripApiPath = `${apiPath.GET_TRIP_BY_ID}${id}`;
  const response = await fetch(tripApiPath, {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: ITripCard = await response.json();

  return data;
});
export { getTrips, getTripById };
