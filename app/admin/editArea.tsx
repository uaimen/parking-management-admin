import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditAreaScreen = () => {
  const { areaId } = useLocalSearchParams();
  const router = useRouter();

  const [areaName, setAreaName] = useState('');
  const [location, setLocation] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://your-api.com/areas/${areaId}`);
        setAreaName(res.data.areaName);
        setLocation(res.data.location);
        setTotalSlots(String(res.data.totalSlots));
      } catch (error) {
        Alert.alert('Error', 'Failed to load area data.');
      } finally {
        setLoading(false);
      }
    };

    if (areaId) fetchArea();
  }, [areaId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`https://your-api.com/areas/${areaId}`, {
        areaName,
        location,
        totalSlots: Number(totalSlots),
      });
      Alert.alert('Success', 'Area updated successfully.');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to update area.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Area Name</Text>
      <TextInput style={styles.input} value={areaName} onChangeText={setAreaName} />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Total Slots</Text>
      <TextInput
        style={styles.input}
        value={totalSlots}
        onChangeText={setTotalSlots}
        keyboardType="numeric"
      />

      <Button title={loading ? 'Saving...' : 'Save Changes'} onPress={handleSave} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditAreaScreen;
