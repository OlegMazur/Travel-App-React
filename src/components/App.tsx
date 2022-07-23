import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './homePage/homePage';
import './App.scss';
import Layout from './layout/layout';
import { RequireAuth } from '../helpers/hoc/RequireAuth';
import TripPage from './trippage/tripspage';
import BookingPage from './bookingspage/bookingpage';
import SignIn from './registration/signin/signin';
import SignUp from './registration/signup/signup';
import { useAppDispatch, useAppSelector } from '../helpers/hooks/useStoreHooks';
import { StorageKey } from '../common/enums/enums';
import { storage } from '../services/services';
import { profileActionCreator, tripsActionCreator } from '../store/actions';
import Spinner from './common/spinner/spinner';

function App() {
  const { user,profileLoading, tripsLoading } = useAppSelector(state => ({
    user: state.profile.user,
    profileLoading:state.profile.loading,
    tripsLoading:state.trips.loading
  }));
  const dispatch = useAppDispatch();
  const token = storage.getItem(StorageKey.TOKEN);
  const hasToken = Boolean(token);
  const hasUser = Boolean(user);
  useEffect(() => {
    if (hasToken) {
      dispatch(profileActionCreator.loadCurrentUser());
      dispatch(tripsActionCreator.getTrips());
    }
  }, [dispatch, hasToken]);
  if (!hasUser && hasToken) {
    return <Spinner />;
  }
  if (profileLoading || tripsLoading) {
    return <Spinner />;
  }
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth hasUser={hasUser}>
                <Homepage />
              </RequireAuth>
            }
          />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route
            path={'trip/:tripId'}
            element={
              <RequireAuth>
                <TripPage />
              </RequireAuth>
            }
          />
          <Route
            path="bookings"
            element={
              <RequireAuth>
                <BookingPage />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <RequireAuth>
                <Homepage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
