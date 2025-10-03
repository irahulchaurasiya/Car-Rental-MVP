import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';

type CarDetailsRouteProp = RouteProp<RootStackParamList, 'BookingForm'>;

const BookingFormScreen = () => {
    const route = useRoute<CarDetailsRouteProp>();
    const { car } = route.params;
    console.log("BookingFormScreen car data:", car);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookingFormScreen</Text>
    </View>
  )
}

export default BookingFormScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  });