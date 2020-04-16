const dateString = new Date((new Date()).getTime() + (10 * 86400000));

export const oneWayTrip = {
  departure: 1,
  destination: [2],
  date: dateString,
  reasons: 'Test chris one way trip',
  accommodationId: 2,
};
export const invalidDestinationTrip = {
  departure: 1,
  destination: ['aaa'],
  date: dateString,
  reasons: 'Test chris one way trip',
  accommodationId: 3,
};
export const invalidDepartureTrip = {
  departure: 'qqq',
  destination: [2],
  date: dateString,
  reasons: 'Test chris one way trip',
  accommodationId: 2,
};

export const incompleteTrip = {
  departure: 1,
  destination: [2],
  date: dateString,
  accommodationId: 2,
};
export const incoDateTrip = {
  departure: 1,
  destination: [2],
  date: '2020-01-02',
  reasons: 'Test chris one way trip',
  accommodationId: 2,
};
export const incoLocation = {
  departure: 10000,
  destination: [20000],
  date: dateString,
  reasons: 'Test chris one way trip this',
  accommodationId: 2,
};
export const returnTrip = {
  departure: 1,
  destination: [2],
  date: dateString,
  returnDate: dateString,
  reasons: 'Test chris one way trip this',
  accommodationId: 2,
};

export const lowReturnTrip = {
  departure: 1,
  destination: [2],
  date: dateString,
  returnDate: '2020-01-02',
  reasons: 'Test chris one way trip this',
  accommodationId: 2,
};
export const multiCityTrip = {
  departure: 1,
  destination: [2, 3],
  date: dateString,
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'Test multi-city trip this',
  accommodationId: 2,
};
