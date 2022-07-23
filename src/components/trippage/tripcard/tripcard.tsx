import React from 'react'
import { Link } from 'react-router-dom'

import { ITripCard } from '../../../common/interfaces/itripcard'


const TripCard:React.FC<ITripCard>=({id,title,description,level,duration,price,image,createdAt})=> {
    return (
    <li className="trip-card">
    <img src={image} alt="trip " />
    <div className="trip-card__content">
        <div className="trip-info">
            <h3 className="trip-info__title">{title}</h3>
            <div className="trip-info__content">
                <span className="trip-info__duration">
                    <strong>{ duration } </strong> days
                </span>
                <span className="trip-info__level">
                    { level }
                </span>
            </div>
        </div>
        <div className="trip-price">
            <span>Price</span>
            <strong className="trip-price__value">
               { price }$
            </strong>
        </div>
    </div>
    <Link to={"trip/:"+id} className="button">
        Discover a trip
    </Link>
</li>
)
}

export default TripCard
