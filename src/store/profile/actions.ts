import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiPath,
  ExceptionMessage,
  HttpCode,
  HttpMethod,
  StorageKey
} from '../../common/enums/enums';
import { storage } from '../../services/services';
import { ActionType } from './common';
interface User {
  id?: string;
  fullName: string;
  email: string;
  createdAt?: string;
  password?: string;
}
interface Ipayload {
  fullName?: string;
  email: string;
  password?: string;
}
interface ProfileState {
  user: User | null;
  token: string | null;
}
const register = createAsyncThunk<
  ProfileState,
  Ipayload,
  { rejectValue: string }
>(ActionType.SIGN_UP, async function (payload, { rejectWithValue }) {
  const response = await fetch(apiPath.SIGN_UP, {
    method: HttpMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: ProfileState = await response.json();
  const { token } = data;
  if (token) {
    storage.setItem(StorageKey.TOKEN, token);
  }

  return data;

});

const signin = createAsyncThunk<
  ProfileState,
  Ipayload,
  { rejectValue: string }
>(ActionType.SIGN_IN, async function (payload, { rejectWithValue }) {
  
  const response = await fetch(apiPath.SIGN_IN, {
    method: HttpMethod.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }
  const data: ProfileState = await response.json();
  const { token } = data;
  if (token) {
    storage.setItem(StorageKey.TOKEN, token);
  }
  return data;

});
const signout = createAsyncThunk<null, null, { rejectValue: string }>(
  ActionType.SIGN_OUT,
  function () {
    storage.removeItem(StorageKey.TOKEN);
    return null;
  }
);

const loadCurrentUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>(ActionType.GET_AUTH_USER, async function (_, { dispatch, rejectWithValue }) {
  try {
    const token = storage.getItem(StorageKey.TOKEN);
    const response = await fetch(apiPath.GET_AUTH_USER, {
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return await response.json();
  } catch (err: any) {
    if (err.message === HttpCode.UNAUTHORIZED) {
      dispatch(signout(null));
    }
    return rejectWithValue(ExceptionMessage.INVALID_TOKEN);
  }
});

export { register, signin, signout, loadCurrentUser };
