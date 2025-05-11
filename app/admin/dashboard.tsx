import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView, 
  ScrollView, 
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get("window");

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          
          console.log("No token found, navigating to login.");
         
          router.replace("/auth/login");
        } else {
          console.log("Token found, user is logged in.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
       
        router.replace("/auth/login");
      }
    };

    const timer = setTimeout(() => {
       checkLoginStatus();
    }, 50); 

    return () => clearTimeout(timer);

  }, [router]); 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" /> {/* Blue spinner */}
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}> {/* Use SafeAreaView */}
      <ScrollView contentContainerStyle={styles.scrollContent}> {/* Use ScrollView */}
        <View style={styles.container}>
          <Text style={styles.title}>Admin Portal</Text>

          
          <View style={styles.optionsContainer}>

            {}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => router.push("/admin/bookings")} 
            >
              <View style={styles.iconContainer}>
                <Ionicons name="book-outline" size={40} color="#fff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>Manage Bookings</Text>
                <Text style={styles.optionDescription}>View active, past, and all booking records.</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward-circle" size={30} color="#007BFF" /> {/* Blue arrow */}
              </View>
            </TouchableOpacity>

            {/* Parking Area Option Card */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => router.push("/admin/parkingArea")} 
            >
              <View style={styles.iconContainer}>
                <Ionicons name="car-outline" size={40} color="#fff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>Parking Areas & Slots</Text>
                <Text style={styles.optionDescription}>View and manage parking locations and their slots.</Text>
              </View>
               <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward-circle" size={30} color="#007BFF" />
              </View>
            </TouchableOpacity>

            {/* Reports Option Card */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => router.push("/admin/reports")} 
            >
              <View style={styles.iconContainer}>
                <Ionicons name="stats-chart-outline" size={40} color="#fff" /> {/* White icon on accent background */}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>View Reports</Text>
                <Text style={styles.optionDescription}>Access occupancy and revenue reports.</Text>
              </View>
               <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward-circle" size={30} color="#007BFF" /> {/* Blue arrow */}
              </View>
            </TouchableOpacity>


          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              await AsyncStorage.removeItem('token'); 
              console.log("User logged out, removing token and navigating to login.");
              router.replace("/auth/login"); // Navigate back to login
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
      flexGrow: 1, 
      paddingBottom: 20, 
  },
  container: {
    flex: 1,
    backgroundColor: "#000", 
    padding: 16,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', 
  },
  loadingText: {
    color: '#007BFF',
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FFFFFF", 
    marginTop: 20, 
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%', 
    
  },
  optionCard: {
    backgroundColor: "#1A1A1A", 
    borderRadius: 12, 
    marginBottom: 15,
    borderLeftWidth: 5, 
    borderLeftColor: "#007BFF",
    flexDirection: 'row',
    alignItems: 'center', 
    position: 'relative', 
  },
  iconContainer: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, 
  },
  textContainer: {
      flex: 1, 
      marginRight: 40, 
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", 
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 13,
    color: "#AAAAAA", 
  },
  arrowContainer: {
    position: "absolute", 
    right: 20, 
    top: '50%', 
    transform: [{ translateY: -15 }], 
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000', 
    alignSelf: 'center', 
  },
  logoutButtonText: {
    color: '#FF0000', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
