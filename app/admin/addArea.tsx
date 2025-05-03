import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AddAreaScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleAddArea = async () => {
    if (!name || !location) {
      Alert.alert('Validation Error', 'Both name and location are required.');
      return;
    }

    try {
      await axios.post('https://your-api.com/admin/areas', {
        name,
        location,
      });

      Alert.alert('Success', 'Parking area added successfully.');
      router.replace('/admin/parkingArea'); // navigate back to the list
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add parking area.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Parking Area</Text>

      <TextInput
        style={styles.input}
        placeholder="Area Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddArea}>
        <Text style={styles.buttonText}>Add Area</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 16, fontSize: 16
  },
  button: {
    backgroundColor: '#2196F3', padding: 16, borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 18 }
});

export default AddAreaScreen;
