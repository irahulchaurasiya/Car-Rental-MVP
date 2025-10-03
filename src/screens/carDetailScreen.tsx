import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

type CarDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;

const { width } = Dimensions.get('window');

const CarDetailsScreen = () => {
  const route = useRoute<CarDetailsRouteProp>();
  const { car } = route.params;
  const navigation = useNavigation<CarDetailsNavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.value}>Car Details</Text>
      </View>

      <View style={styles.carImageContainer}>
        <FlatList
          data={car.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={e => {
            const index = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carImage} />
          )}
        />

        <View style={styles.dotsContainer}>
          {car.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{car.make} {car.model}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Year</Text>
          <Text style={styles.value}>{car.year}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Seats</Text>
          <Text style={styles.value}>{car.seats}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Transmission</Text>
          <Text style={styles.value}>{car.transmission}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.label}>Price Per Day</Text>
          <Text style={styles.price}>${car.pricePerDay}</Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('BookingForm', { car })}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  carImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carImage: {
    width,
    height: 300,
    resizeMode: 'contain'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#ff4444',
  },
  dotInactive: {
    backgroundColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
    textAlign: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e63946',
  },
  bookButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
});
