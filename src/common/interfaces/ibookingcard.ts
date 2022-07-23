export interface IBookingCard {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
  totalPrice: number;
  createdAt: string;
}
