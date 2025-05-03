import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Define the OccupancyItem interface
type OccupancyItem = {
  areaId: number;
  areaName: string;
  occupied: number;
  total: number;
};

const OccupancyReport = () => {
  const [occupancy, setOccupancy] = useState<OccupancyItem[]>([]); // Typed as an array of OccupancyItem
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const response = await axios.get('https://your-api.com/occupancy-report');
        setOccupancy(response.data);
      } catch (error) {
        console.error('Failed to fetch occupancy:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOccupancy();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Occupancy Report</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={occupancy}
          keyExtractor={(item) => item.areaId.toString()}
          renderItem={({ item }: { item: OccupancyItem }) => ( // Explicitly type 'item' as OccupancyItem
            <View style={styles.item}>
              <Text>Area: {item.areaName}</Text>
              <Text>Occupied Slots: {item.occupied}</Text>
              <Text>Total Slots: {item.total}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OccupancyReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 15, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 8,
  },
});
