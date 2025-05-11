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
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you are using AsyncStorage
import axios, { AxiosResponse, AxiosError } from 'axios'; // Assuming you are using axios

// Define interfaces for API data structures (adjust as needed)
interface LoginApiResponse {
    success: boolean; // Assuming a success flag
    token?: string; // Assuming the API returns a token on successful login
    message?: string; // Optional message (e.g., error message)
    // Add other user/login data properties if your API returns them
    user?: {
        id: string;
        email: string;
        role: 'user' | 'admin'; // Example role property
        // Add other user properties
    };
}

// Axios POST Method comments kept but not modified...

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Use Dimensions if you need to adjust styles based on screen size
  // const { height, width } = Dimensions.get('window');

  const router = useRouter(); // Assuming expo-router

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    setLoading(true);

    // --- Dummy Login Logic (Modified to accept any email) ---
    console.log('Attempting dummy login...');
    setTimeout(async () => {
      // Check if the email contains "@" to ensure it's at least email-formatted
      if (email.includes('@')) {
        // Check if email includes 'admin' to determine role
        if (email.toLowerCase().includes('admin')) {
          await AsyncStorage.setItem('token', 'dummy_admin_token'); // Store a dummy token
          Alert.alert('Success', 'Admin Login successful!');
          router.replace('/admin/dashboard'); // Navigate to admin dashboard
        } else {
          // Any other email format will log in as a regular user
          await AsyncStorage.setItem('token', 'dummy_user_token'); // Store a dummy token
          Alert.alert('Success', 'User Login successful!');
          router.replace('/user/dashboard'); // Navigate to a user dashboard path
        }
      } else {
        Alert.alert('Login Failed', 'Please enter a valid email address.');
      }
      setLoading(false);
    }, 1000); // Simulated delay
    // --- End Modified Dummy Login Logic ---
  };

  // Function to navigate to the signup screen
  const handleNavigateToSignup = () => {
      router.push('/auth/signup'); // Assuming '/auth/signup' is your signup route
  };

  // Function to handle forgot password (currently just an alert)
   const handleForgotPassword = () => {
       Alert.alert('Forgot Password', 'Forgot Password functionality coming soon!');
       // Implement actual forgot password logic here
   };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

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

      <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator color="#000" /> // Black spinner on blue button
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Example Google Login Button (replace with actual implementation) */}
       <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Google Login', 'Google Login coming soon!')}>
           <Text style={styles.googleButtonText}>Sign in with Google</Text>
           {/* You would typically add a Google icon here */}
       </TouchableOpacity>

        {/* Link to Sign Up */}
        <View style={styles.signupLinkContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleNavigateToSignup}>
                <Text style={styles.signupLinkText}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007BFF', // Blue text
    fontSize: 14,
    textDecorationLine: 'underline', // Underline for link
  },
  loginButton: {
    backgroundColor: '#007BFF', // Blue background
    height: 50,
    borderRadius: 8, // More rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000000', // Black text on blue button
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333', // Darker grey divider
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#AAAAAA', // Grey text
    fontSize: 14,
  },
  googleButton: {
       // Style for Google button container if needed
       backgroundColor: '#1A1A1A', // Dark grey background
       height: 50,
       borderRadius: 8,
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom: 20,
       borderWidth: 1,
       borderColor: '#007BFF', // Blue border
  },
   googleButtonText: {
       color: '#FFFFFF', // White text
       fontSize: 16,
       fontWeight: 'bold',
   },
  // googleIcon: { width: 30, height: 30 }, // Style for Google icon if used
    signupLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#FFFFFF', // White text
        fontSize: 16,
    },
    signupLinkText: {
        color: '#007BFF', // Blue text
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Underline for link
    },
});

export default LoginScreen;