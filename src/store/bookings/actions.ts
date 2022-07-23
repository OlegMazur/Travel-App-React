import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPath, HttpMethod, StorageKey } from '../../common/enums/enums';
import { IBookingCard } from '../../common/interfaces/ibookingcard';
import { storage } from '../../services/services';
import { ActionType } from './common';
interface IBook {
  tripId: string;
  userId: string;
  guests: number;
  date: string;
}
const createBook = createAsyncThunk<
  IBookingCard,
  IBook,
  { rejectValue: string }
>(ActionType.CREATE_BOOK, async function (payload, { rejectWithValue }) {
  const token = storage.getItem(StorageKey.TOKEN);
  const response = await fetch(apiPath.CREATE_BOOK, {
    method: HttpMethod.POST,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: IBookingCard = await response.json();

  return data;
});
const getBookings = createAsyncThunk<
  IBookingCard[],
  undefined,
  { rejectValue: string }
>(ActionType.GET_BOOKINGS, async function (_, { rejectWithValue }) {
  const token = storage.getItem(StorageKey.TOKEN);
  const response = await fetch(apiPath.GET_BOOKINGS, {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: IBookingCard[] = await response.json();

  return data;
});
const deleteBook = createAsyncThunk<any, string, { rejectValue: string }>(
  ActionType.DELETE_BOOK_BY_ID,
  async function (id, { rejectWithValue }) {
    const token = storage.getItem(StorageKey.TOKEN);
    const apiBookPath = `${apiPath.DELETE_BOOK}${id}`;
    const response = await fetch(apiBookPath, {
      method: HttpMethod.DELETE,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }

    return id;
  }
);

export { createBook, getBookings, deleteBook };
