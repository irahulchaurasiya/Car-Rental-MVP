// export const api = {
//     login: async () => Promise.resolve(require("../mocks/login.json")),
//     signup: async () => Promise.resolve(require("../mocks/signup.json")),
//     getCars: async () => Promise.resolve(require("../mocks/cars.json")),
//     getLocations: async () => Promise.resolve(require("../mocks/locations.json")),
//     getBookings: async () => Promise.resolve(require("../mocks/bookings.json")),
//   };

const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

export const api = {
  login: async () => {
    await delay(3000);
    return require("../mocks/login.json");
  },
  signup: async () => {
    await delay(3000);
    return require("../mocks/signup.json");
  },
  getCars: async () => {
    await delay(2000);
    return require("../mocks/cars.json");
  }
};
