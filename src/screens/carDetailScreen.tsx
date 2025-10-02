import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../types/navigation';

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

const CarDetailsScreen = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const { car } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: car.images[0] }} style={styles.carImage} />
      <Text style={styles.title}>{car.make} {car.model}</Text>
      <Text style={styles.text}>Year: {car.year}</Text>
      <Text style={styles.text}>Seats: {car.seats}</Text>
      <Text style={styles.text}>Transmission: {car.transmission}</Text>
      <Text style={styles.price}>${car.pricePerDay}/day</Text>
    </View>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  carImage: { width: '100%', height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  text: { fontSize: 16, marginVertical: 2 },
  price: { fontSize: 20, color: 'green', marginTop: 10 }
});
