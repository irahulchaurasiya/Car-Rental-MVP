import { Cars } from './global';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: Cars };
  Bookings: undefined;
  Profile: undefined;
  Login: undefined;
  Signup: undefined;
};
