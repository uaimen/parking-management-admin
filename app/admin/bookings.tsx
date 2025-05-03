import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Booking {
  id: string;
  areaName: string;
  slotNumber: number;
  user: string;
  startTime: string;
  endTime: string;
}

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://your-api.com/booking/active'); // Replace with actual API
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderItem = ({ item }: { item: Booking }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.areaName}</Text>
      <Text style={styles.cell}>{item.slotNumber}</Text>
      <Text style={styles.cell}>{item.user}</Text>
      <Text style={styles.cell}>{item.startTime}</Text>
      <Text style={styles.cell}>{item.endTime}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Area</Text>
        <Text style={styles.header}>Slot</Text>
        <Text style={styles.header}>User</Text>
        <Text style={styles.header}>Start</Text>
        <Text style={styles.header}>End</Text>
      </View>
      <FlatList data={bookings} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  header: { flex: 1, fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', marginBottom: 8 },
  cell: { flex: 1, fontSize: 14 },
});

export default BookingsScreen;
