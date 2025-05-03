import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://your-api.com/auth/signup', {
        name,
        email,
        password,
      });

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/auth/login'); //
    } catch (err: any) {
      console.error(err);
      Alert.alert('Signup Failed', err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 50, marginBottom: 30 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#f9f9f9'
  },
  signupButton: {
    backgroundColor: '#1a2857', height: 50, borderRadius: 5,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  signupButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
