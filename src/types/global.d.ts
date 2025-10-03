export type Cars = {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  images: string[];
  seats: number;
  transmission: string;
}

export type LoginValues = {
  email: string;
  password: string;
}

export type SignupValues = {
  name: string;
  email: string;
  password: string;
}
