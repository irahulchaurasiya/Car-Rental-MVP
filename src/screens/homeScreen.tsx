import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
      <Text style={styles.title}>All Cars</Text>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CarDetails', { car: item })}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={styles.carImage}
              resizeMode="cover"
            />
            <Text style={styles.carText}>{item.make} {item.model}</Text>
            <Text style={styles.priceText}>${item.pricePerDay}/day</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start'},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { marginBottom: 20, alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10 },
  carImage: { width: '100%', height: 200, borderRadius: 10 },
  carText: { fontSize: 18, fontWeight: '600', marginTop: 10 },
  priceText: { fontSize: 16, color: 'gray' }
})
