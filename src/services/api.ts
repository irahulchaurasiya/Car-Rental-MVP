export const api = {
    login: async () => Promise.resolve(require("../mocks/login.json")),
    signup: async () => Promise.resolve(require("../mocks/signup.json")),
    getCars: async () => Promise.resolve(require("../mocks/cars.json")),
    getLocations: async () => Promise.resolve(require("../mocks/locations.json")),
    getBookings: async () => Promise.resolve(require("../mocks/bookings.json")),
  };
