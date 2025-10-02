import { Cars } from './global';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: Cars };
};
