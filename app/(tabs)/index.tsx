import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Ionicons } from '@expo/vector-icons'; 

const WelcomeScreen: FC = () => {
  return (
   
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
 
        <Text style={styles.title}>Welcome to Parking Admin App</Text>

        {/* Login Button */}
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>

        {/* Signup Button */}
        <Link href="/auth/signup" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </Link>

   

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Match the dark background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24, // Slightly increased padding
    backgroundColor: '#000', // Match the dark background
  },
   icon: {
    marginBottom: 30,
   },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 50, // More space below title
    textAlign: 'center', // Center the title
    color: '#FFFFFF', // White text for dark theme
  },
  button: {
    backgroundColor: '#007BFF', // Use the blue accent color
    paddingVertical: 15, // Consistent vertical padding
    paddingHorizontal: 30, // Consistent horizontal padding
    borderRadius: 10, // Rounded corners
    width: '85%', // Slightly wider buttons
    alignItems: 'center',
    marginBottom: 15, // Space between buttons
    // Added subtle shadow for depth (optional, adjust as needed)
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // For Android shadow
  },
  buttonText: {
    color: '#000000', // Black text on blue button
    fontSize: 18,
    fontWeight: 'bold', // Make text bold
  },

  footerText: {
     marginTop: 30,
    fontSize: 14,
     color: '#AAAAAA', // Grey color for less emphasis
    textAlign: 'center',},
});

export default WelcomeScreen;
