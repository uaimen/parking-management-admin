"use client"

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// Define the ProfileData interface
interface ProfileData {
  name: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null); // State is either ProfileData or null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>
      <Text style={styles.label}>Name: {profile.name}</Text>
      <Text style={styles.label}>Email: {profile.email}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  loading: { marginTop: 50, textAlign: 'center', fontSize: 16 },
});
