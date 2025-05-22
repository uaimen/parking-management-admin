import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView, 
  ScrollView, 
} from 'react-native';
import axios, { AxiosResponse, AxiosError } from 'axios'; 
import { Ionicons } from '@expo/vector-icons'; 

// Define interfaces for your booking data
// Ensure this matches the structure returned by your API
interface Booking {
  id: string;
  areaName: string;
  slotNumber: number;
  user: string; 
  startTime: string;
  endTime: string;
 
}


interface BookingApiResponse {
  success: boolean;
  data: Booking[];
  message?: string;
}

// Define the types for the booking categories
type BookingCategory = 'active' | 'past' | 'all';

const BookingsScreen = () => {
  // to hold the currently displayed bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  // to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<BookingCategory>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  const loadBookings = useCallback(async (category: BookingCategory) => {
    setLoading(true);
    setError('');
    try {
      
      // For now
      const dummyData: Booking[] = [
        { id: '1', areaName: 'North Lot', slotNumber: 12, user: 'Aimen', startTime: '2025-05-05 08:00', endTime: '2025-05-05 10:00' }, // Active
        { id: '2', areaName: 'East Wing', slotNumber: 7, user: 'Samrah Mumtaz', startTime: '2025-05-06 09:30', endTime: '2025-05-06 11:00' }, // Active
        { id: '3', areaName: 'South Zone', slotNumber: 25, user: 'Sohaib', startTime: '2024-12-01 14:00', endTime: '2024-12-01 16:00' }, // Past
        { id: '4', areaName: 'West Area', slotNumber: 3, user: 'Saneha Akhtar', startTime: '2024-11-15 10:00', endTime: '2024-11-15 11:30' }, // Past
        { id: '5', areaName: 'Central Hub', slotNumber: 8, user: 'Fatima', startTime: '2025-05-10 11:00', endTime: '2025-05-10 13:00' }, // Active (Future)
        { id: '6', areaName: 'North Lot', slotNumber: 15, user: 'Ali', startTime: '2024-10-20 10:00', endTime: '2024-10-20 12:00' }, // Past
      ];

     
      const now = new Date();
      const filteredData = dummyData.filter(booking => {
        const startTime = new Date(booking.startTime);
        const endTime = new Date(booking.endTime);

        if (category === 'active') {
          
          return endTime > now;
        } else if (category === 'past') {
         
          return endTime <= now;
        } else { 
          return true; 
        }
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setBookings(filteredData);

    } catch (err: any) {
      // In a real scenario
      setError('Failed to load bookings.');
      setBookings([]); 
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    loadBookings(selectedCategory);
  }, [selectedCategory, loadBookings]); 


  const handleCategoryPress = (category: BookingCategory) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      
    }
  };

  // Function to render each booking item in the list
  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}> {/* Use card style for list items */}
      <View style={styles.bookingCardHeader}>
         <Ionicons name="calendar-outline" size={24} color="#007BFF" /> {/* Icon */}
         <Text style={styles.bookingAreaText}>{item.areaName} - Slot {item.slotNumber}</Text>
      </View>
      <View style={styles.bookingCardDetail}>
         <Text style={styles.bookingDetailText}>User: {item.user}</Text>
         <Text style={styles.bookingDetailText}>Start: {item.startTime}</Text>
         <Text style={styles.bookingDetailText}>End: {item.endTime}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}> 
      <View style={styles.container}>
        <Text style={styles.header}>My Bookings</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          <TouchableOpacity
            style={[
              styles.categoryPill,
              selectedCategory === 'active' && styles.selectedCategoryPill,
            ]}
            onPress={() => handleCategoryPress('active')}
          >
            <Text style={[
                styles.categoryPillText,
                selectedCategory === 'active' && styles.selectedCategoryPillText
              ]}>
              Active
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryPill,
              selectedCategory === 'past' && styles.selectedCategoryPill,
            ]}
            onPress={() => handleCategoryPress('past')}
          >
            <Text style={[
                styles.categoryPillText,
                selectedCategory === 'past' && styles.selectedCategoryPillText
              ]}>
              Past
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryPill,
              selectedCategory === 'all' && styles.selectedCategoryPill,
            ]}
            onPress={() => handleCategoryPress('all')}
          >
            <Text style={[
                styles.categoryPillText,
                selectedCategory === 'all' && styles.selectedCategoryPillText
              ]}>
              All
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainerAbsolute}> {/* Use absolute position for loading */}
             <ActivityIndicator size="large" color="#007BFF" />
          </View>
        )}

        {/* Error Message */}
        {error && !loading && <Text style={styles.errorText}>{error}</Text>}

        {/* Bookings List */}
        {!loading && !error && (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.bookingsList}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No {selectedCategory} bookings found.</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', 
  },
  container: {
    flex: 1,
    backgroundColor: '#000', 
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF', 
    marginTop: 10,
  },
  categoryList: {
    paddingBottom: 20, 
  },
  categoryPill: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10, 
    borderWidth: 1,
    borderColor: '#007BFF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryPill: {
    backgroundColor: '#007BFF', 
    borderColor: '#007BFF',
  },
  categoryPillText: {
    color: '#FFFFFF', 
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedCategoryPillText: {
    color: '#000000', 
  },
  loadingContainerAbsolute: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1, 
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  bookingsList: {
   
  },
  bookingCard: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 12, 
    borderLeftWidth: 4, 
    borderLeftColor: '#007BFF', 
  },
  bookingCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
  },
  bookingAreaText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF', 
      marginLeft: 10,
  },
  bookingCardDetail: {
      // Container for detail text
  },
  bookingDetailText: {
      fontSize: 13,
      color: '#AAAAAA', 
      marginBottom: 4,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    color: '#AAAAAA', 
    fontSize: 16,
  },
});

export default BookingsScreen;
