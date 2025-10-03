import { Cars } from './global';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: Cars };
  BookingForm: { car: Cars };
  Bookings: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
