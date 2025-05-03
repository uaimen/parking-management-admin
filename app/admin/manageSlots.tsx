import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

// Define the Slot interface
interface Slot {
  id: string;
  name: string;
  isActive: boolean;
}

const ManageSlots = () => {
  // Type the state to be an array of Slot objects
  const [slots, setSlots] = useState<Slot[]>([]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get('https://your-api.com/slots');
      setSlots(response.data);
    } catch (error) {
      console.error('Failed to load slots:', error);
    }
  };

  const toggleSlotStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`https://your-api.com/slots/${id}`, {
        isActive: !currentStatus,
      });
      fetchSlots();
    } catch (error) {
      Alert.alert('Update Failed', 'Could not update slot status.');
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Slots</Text>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Slot }) => (
          <View style={styles.slotCard}>
            <Text>Slot: {item.name}</Text>
            <Text>Status: {item.isActive ? 'Active' : 'Inactive'}</Text>
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => toggleSlotStatus(item.id, item.isActive)}
            >
              <Text style={styles.toggleBtnText}>Toggle Status</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageSlots;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  slotCard: {
    backgroundColor: '#e7e7e7', padding: 15,
    borderRadius: 8, marginBottom: 10,
  },
  toggleBtn: {
    backgroundColor: '#1a2857', padding: 10,
    marginTop: 10, borderRadius: 5, alignItems: 'center',
  },
  toggleBtnText: { color: '#fff' },
});
