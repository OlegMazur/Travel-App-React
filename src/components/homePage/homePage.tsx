import React, { useEffect, useState } from 'react';
import data from '../../data/tripcarddata.json';
import './homepage.scss';
import TripCard from '../trippage/tripcard/tripcard';
import { ITripCard } from '../../common/interfaces/itripcard';
import { useAppSelector } from '../../helpers/hooks/useStoreHooks';
function Homepage() {
  const trips: ITripCard[] = useAppSelector(state => state.trips.trips);
  const [propdata, setdata] = useState<ITripCard[]>([]);

  useEffect(() => {
    if (trips) {
      setdata(trips);
    }
  }, [trips]);

  const searchHendler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    switch (target.name) {
      case 'search': {
        const newData = data.filter(item =>
          item.title.toLowerCase().startsWith(target.value.toLowerCase())
        );
        target.value ? setdata(newData) : setdata(data);
      }
    }
  };
  const durationHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const [min, max] = target.value.split('_x_');
    const newData = data.filter(item => {
      if (!max) {
        return item.duration > Number(min);
      }
      return item.duration > Number(min) && item.duration < Number(max);
    });
    setdata(newData);
  };
  const levelHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const newData = data.filter(item => {
      if (target.value === 'level') {
        return true;
      }
      return item.level === target.value;
    });
    target.value ? setdata(newData) : setdata(data);
  };
  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input
              name="search"
              type="search"
              placeholder="search by title"
              onChange={searchHendler}
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select name="duration" onChange={durationHandler}>
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10_x_">&ge; 10 days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select name="level" onChange={levelHandler}>
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <ul className="trip-list">
          {propdata.map(
            ({
              id,
              title,
              description,
              level,
              duration,
              price,
              image,
              createdAt
            }) => {
              return (
                <TripCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  level={level}
                  duration={duration}
                  price={price}
                  image={image}
                  createdAt={createdAt}
                />
              );
            }
          )}
        </ul>
      </section>
    </main>
  );
}

export default Homepage;
