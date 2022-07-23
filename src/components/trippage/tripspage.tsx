import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../helpers/hooks/useStoreHooks';
import { tripsActionCreator } from '../../store/actions';
import TripModal from '../modal/tripmodal';
import './trippage.scss';

const TripPage: React.FC = () => {
  const searchParams = useParams();
  const dispatch = useAppDispatch();
  const {trip,userid} = useAppSelector(state => ({
    trip:state.trips.trip,
    userid:state.profile.user?.id
  }));
  const tripiId = searchParams.tripId?.substring(1);
  useEffect(() => {
    if (tripiId) {
      dispatch(tripsActionCreator.getTripById(tripiId));
    }
  }, [dispatch, tripiId]);
  const [isHidden, setHidden] = useState<boolean>(true);
  const { id, title, description, level, duration, price, image, createdAt } =
    trip
      ? trip
      : {
          id: '',
          title: '',
          description: '',
          level: '',
          duration: 0,
          price: 0,
          image: '',
          createdAt: ''
        };
  const showModal = () => {
    setHidden(!isHidden);
  };
  return (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img src={image} className="trip__img" alt="trip " />
        <div className="trip__content">
          <div className="trip-info">
            <h3 className="trip-info__title">{title}</h3>
            <div className="trip-info__content">
              <span className="trip-info__duration">
                <strong>{duration}</strong> days
              </span>
              <span className="trip-info__level">{level}</span>
            </div>
          </div>
          <div className="trip__description">{description}</div>
          <div className="trip-price">
            <span>Price</span>
            <strong className="trip-price__value">{price}$</strong>
          </div>
          <button className="trip__button button" onClick={showModal}>
            Book a trip
          </button>
        </div>
      </div>
      <TripModal
        isHidden={isHidden}
        setHidden={setHidden}
        userid={userid}
        activeTrip={{
          id,
          title,
          description,
          level,
          duration,
          price,
          image,
          createdAt
        }}
      />
    </main>
  );
};

export default TripPage;
