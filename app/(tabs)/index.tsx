import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FC } from 'react';

const WelcomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Parking Admin App</Text>
      <Link href="/auth/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/auth/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18 },
});

export default WelcomeScreen;
