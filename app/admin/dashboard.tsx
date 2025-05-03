import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";  // Correct import for routing

const Dashboard = () => {
  const router = useRouter(); // Using router for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Portal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/bookings")} // Ensure this matches the file name and path
      >
        <Text style={styles.buttonText}>ALL BOOKINGS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/parkingArea")} // Check the exact path of parking.tsx
      >
        <Text style={styles.buttonText}>PARKING AREA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/revenueReport")} // Ensure the revenue page is in the correct location
      >
        <Text style={styles.buttonText}>REVENUE REPORT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/occupancyReport")} // Same for occupancy.tsx
      >
        <Text style={styles.buttonText}>OCCUPANCY REPORT</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling for the dashboard with updated color scheme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background color
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a2857", // Blue color for title
  },
  button: {
    backgroundColor: "#1a2857", // Blue button background
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15, // Space between buttons
    width: "80%", // Button width relative to screen
    alignItems: "center", // Center text horizontally
  },
  buttonText: {
    color: "#fff", // White text on the blue buttons
    fontSize: 16,
    fontWeight: "600", // Bold font weight for readability
  },
});

export default Dashboard;
