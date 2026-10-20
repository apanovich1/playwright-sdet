// Request payload for restful-booker POST /booking — field names mirror the API contract
export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  bookingdates: BookingDates;
  totalprice: number;
  depositpaid: boolean;
  additionalneeds?: string;
}

export const newBooking: Booking = {
  firstname: "Luigi",
  lastname: "Rossi",
  bookingdates: {
    checkin: "2026-01-01",
    checkout: "2026-01-02",
  },
  totalprice: 111,
  depositpaid: true,
  additionalneeds: "Breakfast",
};
