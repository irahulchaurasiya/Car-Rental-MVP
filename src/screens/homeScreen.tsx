import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { api } from '../services/api'
import { Cars } from '../types/global'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [cars, setCars] = useState<Cars[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await api.getCars();
      setCars(response);
      console.log("Cars data:", response);
    };
    fetchCars();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CarDetails', { car: item })}
          >
            <View>
              <Image source={{ uri: item.images[0] }} style={styles.carImage} resizeMode="cover" />
              <View style={styles.overlay}>
                <Text style={styles.carText}>{item.make} {item.model}</Text>
                <Text style={styles.priceText}>${item.pricePerDay}/day</Text>
              </View>
            </View>

          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'flex-start', 
    backgroundColor: '#f9fafb' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  carImage: {
    width: '100%',
    height: 300,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  carText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  priceText: { 
    color: '#ffd700', 
    fontWeight: '600', 
    fontSize: 16 
  },
})
