import React, { useEffect, useState } from 'react';
import './bookingpage.scss';

import { IBookingCard } from '../../common/interfaces/ibookingcard';
import {
  useAppDispatch,
  useAppSelector
} from '../../helpers/hooks/useStoreHooks';
import { bookingsActionCreator } from '../../store/actions';
import Spinner from '../common/spinner/spinner';
function BookingPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(state => ({
    
    data: state.bookings.bookingCard,
    loading: state.bookings.loading
  }));

  const [bookingData, setBukingData] = useState<IBookingCard[]>([]);

  const formatDate = (date: string) => {
    const result = new Date(date);
    return result.toLocaleDateString();
  };
  const deleteHandler = (id: string) => {
    dispatch(bookingsActionCreator.deleteBook(id));
  };
  useEffect(() => {
    setBukingData(data);
  }, [dispatch, data]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookingData &&
          bookingData.map(
            ({
              id,
              userId,
              tripId,
              guests,
              date,
              trip,
              totalPrice,
              createdAt
            }) => {
              return (
                <li className="booking" key={id}>
                  <h3 className="booking__title">{trip.title}</h3>
                  <span className="booking__guests">
                    {guests === 1 ? guests + ' guest' : guests + ' guests'}
                  </span>
                  <span className="booking__date">{formatDate(date)}</span>
                  <span className="booking__total">{totalPrice + '$'}</span>
                  <button
                    className="booking__cancel"
                    title="Cancel booking"
                    onClick={() => deleteHandler(id)}
                  >
                    <span className="visually-hidden">Cancel booking</span>×
                  </button>
                </li>
              );
            }
          )}
      </ul>
    </main>
  );
}

export default BookingPage;
