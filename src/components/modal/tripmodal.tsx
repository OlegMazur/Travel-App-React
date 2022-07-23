import React, { FC, useState } from 'react';
import { TotalPrice } from '../../helpers/tripservice/tripservice';
import { ITripCard } from '../../common/interfaces/itripcard';
import './tripmodal.scss';
import { useAppDispatch } from '../../helpers/hooks/useStoreHooks';
import { bookingsActionCreator } from '../../store/actions';
interface IpropModal {
  activeTrip: ITripCard;
  isHidden: boolean;
  userid: any;
  setHidden: (isHidden: boolean) => void;
}

const TripModal: FC<IpropModal> = prop => {
  const { isHidden, setHidden, userid } = prop;
  const dispatch = useAppDispatch();
  const { title, level, duration, price, id } = prop.activeTrip;
  const [numberOfGuests, setNumberOfGuests] = useState<string>('1');
  const nowDate = new Date();
  const minDate =
    nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
  const [date, setDate] = useState(nowDate);
  const totalPrice = TotalPrice(numberOfGuests, price);

  const handleGuest = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNumberOfGuests(value);
  };
  const handleClose = () => {
    setNumberOfGuests('1');
    setHidden(!isHidden);
  };
  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setDate(new Date(value));
  };
  const time = date.getTime() - nowDate.getTime() < 0;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNumberOfGuests('1');
    setHidden(!isHidden);
    dispatch(
      bookingsActionCreator.createBook({
        tripId: id,
        userId: userid,
        guests: Number(numberOfGuests),
        date: date.toISOString()
      })
    );
  };

  return (
    <div hidden={isHidden}>
      <div className="modal">
        <div className="trip-popup">
          <button className="trip-popup__close" onClick={handleClose}>
            ×
          </button>
          <form
            className="trip-popup__form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="trip-info">
              <h3 className="trip-info__title">{title}</h3>
              <div className="trip-info__content">
                <span className="trip-info__duration">
                  <strong>{duration}</strong> days
                </span>
                <span className="trip-info__level">{level}</span>
              </div>
            </div>
            <label className="trip-popup__input input">
              <span className="input__heading">{date.toDateString()}</span>
              <input
                name="date"
                type="date"
                min={minDate}
                required
                onChange={dateHandler}
              />
            </label>
            <label className="trip-popup__input input">
              <span className="input__heading">Number of guests</span>
              <input
                name="guests"
                type="number"
                min="1"
                max="10"
                value={numberOfGuests}
                onChange={handleGuest}
                required
              />
            </label>
            <span className="trip-popup__total">
              Total:{' '}
              <output className="trip-popup__total-value">
                {totalPrice + '$'}
              </output>
            </span>
            <button className="button" type="submit" disabled={time}>
              Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripModal;
