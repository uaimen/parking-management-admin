import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../types'; // Update path if your types file is elsewhere

type ParkingArea = {
  id: string;
  name: string;
  totalSlots: number;
  availableSlots: number;
};

type NavigationProp = NativeStackNavigationProp<AdminStackParamList, 'parkingArea'>;


const ParkingAreaScreen = () => {
  const [areas, setAreas] = useState<ParkingArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('https://your-api.com/parkingAreas'); // Replace with real API
        setAreas(response.data);
      } catch (err) {
        setError('Failed to load parking areas');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const renderItem = ({ item }: { item: ParkingArea }) => (
    <TouchableOpacity
      style={styles.areaCard}
      onPress={() => navigation.navigate('editArea', { areaId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Total Slots: {item.totalSlots}</Text>
      <Text style={styles.detail}>Available Slots: {item.availableSlots}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  if (error) return <Text>{error}</Text>;

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Manage Parking Areas</Text>
      <FlatList
        data={areas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  list: { paddingBottom: 16 },
  areaCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  detail: { fontSize: 14, color: '#555' },
});

export default ParkingAreaScreen;
