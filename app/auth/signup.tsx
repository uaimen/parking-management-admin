import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions, // Import Dimensions for potential responsiveness adjustments
} from 'react-native';
import { useRouter } from 'expo-router'; // Assuming you are using expo-router for navigation
import axios, { AxiosResponse, AxiosError } from 'axios'; // Assuming you are using axios

// Define interfaces for API data structures (adjust as needed)
// Assuming signup API might return user data or a confirmation
interface SignupApiResponse {
    success: boolean; // Assuming a success flag
    message?: string; // Optional message (e.g., success or error message)
    // Add other properties if your API returns them (e.g., a new user ID)
    userId?: string;
}

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

   
  const router = useRouter(); // Assuming expo-router

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    setLoading(true);

  
    console.log('Attempting dummy signup...');
    setTimeout(() => {
      Alert.alert('Success', 'Dummy Account created successfully!');
      router.replace('/auth/login'); // Navigate to login after dummy signup
      setLoading(false);
    }, 1000); // Simulated delay
    // --- End Dummy Signup Logic ---

  };

    // Function to navigate to the login screen
  const handleNavigateToLogin = () => {
      router.push('/auth/login'); // Assuming '/auth/login' is your login route
  };


  return (
    <View style={styles.container}>
       <Text style={styles.title}>Create Account</Text>
       <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888" // Placeholder text color
        value={name}
        onChangeText={setName}
         // Added theme-consistent input styling
        selectionColor="#007BFF" // Cursor color
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888" // Placeholder text color
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
         // Added theme-consistent input styling
        selectionColor="#007BFF" // Cursor color
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888" // Placeholder text color
        value={password}
        onChangeText={setPassword}
        secureTextEntry
         // Added theme-consistent input styling
        selectionColor="#007BFF" // Cursor color
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator color="#000" /> // Black spinner on blue button
        ) : (
          <Text style={styles.signupButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

       {/* Link to Login */}
        <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.loginLinkText}>Login</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    padding: 20,
     justifyContent: 'center', // Center content vertically
  },
  title: {
    fontSize: 28, // Larger title
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'center',
    marginBottom: 10,
  },
   subtitle: {
       fontSize: 16,
       color: '#AAAAAA', // Grey subtitle
       textAlign: 'center',
       marginBottom: 30,
   },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#007BFF', // Blue border
    borderRadius: 8, // More rounded corners
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#1A1A1A', // Dark grey input background
    color: '#FFFFFF', // White text input color
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#007BFF', // Blue background
    height: 50,
    borderRadius: 8, // More rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#000000', // Black text on blue button
    fontSize: 18,
    fontWeight: 'bold',
  },
   loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        color: '#FFFFFF', // White text
        fontSize: 16,
    },
    loginLinkText: {
        color: '#007BFF', // Blue text
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Underline for link
    },
});

export default SignupScreen;
