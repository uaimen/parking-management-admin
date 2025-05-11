import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';


import { Ionicons } from '@expo/vector-icons';

interface ParkingLocation {
  id: string;
  name: string;
  displayName: string;
}

interface ParkingSlot {
  id: string;
  slotNumber: number;
  rowName: string;
  isOccupied: boolean;
}

const { width } = Dimensions.get('window');

const slotMargin = 3;
const numColumns = 10;
const containerPadding = 16 * 2;
const totalHorizontalMargin = slotMargin * (numColumns * 2);
const slotSize = (width - containerPadding - totalHorizontalMargin) / numColumns;

const generateSlots = (rowName: string, count: number, occupiedChance: number): ParkingSlot[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `slot-${rowName}-${i + 1}-${Math.random().toString(36).substring(2, 5)}`,
        slotNumber: i + 1,
        rowName: rowName,
        isOccupied: Math.random() < occupiedChance,
    }));
};

const ParkingAreaScreen = () => {

  const [locations, setLocations] = useState<ParkingLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ParkingLocation | null>(null);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);

  const [loadingLocations, setLoadingLocations] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');

  const loadLocations = useCallback(async () => {
    setLoadingLocations(true);
    setError('');
    try {
      // Initial dummy location data including Admin Block
      const initialDummyLocationData: ParkingLocation[] = [
        { id: 'loc1', name: 'nstpparking', displayName: 'NSTP Parking' },
        { id: 'loc2', name: 'seecsparking', displayName: 'SEECS Parking' },
        { id: 'loc3', name: 'library', displayName: 'Library Parking' },
        { id: 'loc4', name: 'adminblock', displayName: 'Admin Block Parking' },
      ];

      await new Promise(resolve => setTimeout(resolve, 500));

      setLocations(initialDummyLocationData);

    } catch (err: any) {
      setError(err.message || 'Failed to load parking locations.');
      setLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  }, []);

  const loadSlots = useCallback(async (locationName: string) => {
      setLoadingSlots(true);
      setError('');
      setSlots([]);

      try {
        let dummySlotData: ParkingSlot[] = [];

        if (['nstpparking', 'seecsparking', 'library', 'adminblock'].includes(locationName)) {
            dummySlotData = [
                ...generateSlots('A', 10, Math.random() * 0.8),
                ...generateSlots('B', 10, Math.random() * 0.8),
                ...generateSlots('C', 10, Math.random() * 0.8),
            ];
        }
         else {
              console.log(`Generating default slots for new location: ${locationName}`);
              dummySlotData = generateSlots('A', 10, 0);
         }

        await new Promise(resolve => setTimeout(resolve, 300));

        dummySlotData.sort((a, b) => {
            if (a.rowName < b.rowName) return -1;
            if (a.rowName > b.rowName) return 1;
            return a.slotNumber - b.slotNumber;
        });

        setSlots(dummySlotData);

      } catch (err: any) {
        setError(err.message || `Failed to load slots for ${locationName}.`);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
  }, []);

  const handleAddParkingArea = useCallback(() => {
    const newAreaId = `loc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newAreaName = `newarea-${Date.now()}`;
    const newAreaDisplayName = 'New Area';

    const newLocation: ParkingLocation = {
        id: newAreaId,
        name: newAreaName,
        displayName: newAreaDisplayName
    };

    //  Integrate API call here to add the new location to your backend
    // Example (uncomment and replace with your API logic):
    /*
    addParkingArea({ name: newLocation.name, displayName: newLocation.displayName })
      .then(addedLocation => {
        if (addedLocation) {
          setLocations(prevLocations => [...prevLocations, addedLocation]);
          setSelectedLocation(addedLocation);
          Alert.alert('Success', `${addedLocation.displayName} added successfully!`);
        } else {
           Alert.alert('Error', 'Failed to add parking area.');
        }
      })
      .catch(err => {
         Alert.alert('Error', err.message || 'An error occurred while adding the parking area.');
      });
    */

    // Dummy logic to add and select the new location locally (remove when using API)
    setLocations(prevLocations => [...prevLocations, newLocation]);
    setSelectedLocation(newLocation);


  }, []);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  useEffect(() => {
      if (selectedLocation) {
          loadSlots(selectedLocation.name);
      } else {
          setSlots([]);
      }
  }, [selectedLocation, loadSlots]);

  const handleLocationSelect = (location: ParkingLocation) => {
    setSelectedLocation(location);
  };

  const renderSlotItem = ({ item }: { item: ParkingSlot }) => (
    <TouchableOpacity
      style={[
        styles.slot,
        item.isOccupied ? styles.occupiedSlot : styles.availableSlot,
      ]}
    >
      <Text style={styles.slotText}>{`${item.rowName}${item.slotNumber}`}</Text>
    </TouchableOpacity>
  );

  if (loadingLocations) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading parking locations...</Text>
      </View>
    );
  }

  if (error && locations.length === 0) {
      return (
       <View style={styles.errorContainer}>
         <Text style={styles.errorText}>{error}</Text>
       </View>
      );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Parking Areas</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.locationList}>
          {locations.map(location => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.locationPill,
                selectedLocation?.id === location.id && styles.selectedLocationPill,
              ]}
              onPress={() => handleLocationSelect(location)}
            >
              <Text style={[
                styles.locationPillText,
                selectedLocation?.id === location.id && styles.selectedLocationPillText,
              ]}>
                {location.displayName}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.addAreaButton}
            onPress={handleAddParkingArea}
          >
             <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>

        </ScrollView>

      {selectedLocation && (
        <View style={styles.slotsSection}>
          <Text style={styles.slotsHeader}>
            Slots for {selectedLocation.displayName}
          </Text>

          {loadingSlots && (
               <View style={styles.loadingSlotsContainer}>
                 <ActivityIndicator size="large" color="#007BFF" />
                 <Text style={styles.loadingText}>Loading slots...</Text>
               </View>
          )}

          {error && selectedLocation && !loadingSlots && (
               <View style={styles.errorContainer}>
                 <Text style={styles.errorText}>{error}</Text>
               </View>
          )}

          {!loadingSlots && !error && (
               <FlatList
                 data={slots}
                 renderItem={renderSlotItem}
                 keyExtractor={(item) => item.id}
                 numColumns={numColumns}
                 key={numColumns}
                 columnWrapperStyle={styles.slotRow}
                 contentContainerStyle={styles.slotsGrid}
                 ListEmptyComponent={() => (
                    <View style={styles.emptyListContainer}>
                       <Text style={styles.emptyListText}>No slots found for this location.</Text>
                    </View>
                 )}
               />
          )}
        </View>
      )}

      {!selectedLocation && !loadingLocations && !error && locations.length > 0 && (
           <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>Please select a parking area to view slots.</Text>
           </View>
      )}

       {!selectedLocation && !loadingLocations && !error && locations.length === 0 && (
            <View style={styles.emptyStateContainer}>
               <Text style={styles.emptyStateText}>No parking areas available. Add one!</Text>
            </View>
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
   errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
     },
   errorText: {
      color: '#FF0000',
      textAlign: 'center',
      fontSize: 16,
     },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 10,
  },
  locationList: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  locationPill: {
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
  selectedLocationPill: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  locationPillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
    selectedLocationPillText: {
      color: '#000000',
    },
   addAreaButton: {
     backgroundColor: '#007BFF',
     width: 40,
     height: 40,
     borderRadius: 20,
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 10,
     marginRight: 5,
     paddingVertical: 0,
     paddingHorizontal: 0,
   },
  slotsSection: {
    flex: 1,
    marginTop: 10,
  },
  slotsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingSlotsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
   },
  slotsGrid: {
  },
  slotRow: {
    justifyContent: 'space-between',
    marginBottom: slotMargin * 2,
  },
  slot: {
    width: slotSize,
    height: slotSize,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: slotMargin,
  },
  availableSlot: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#555555',
  },
  occupiedSlot: {
    backgroundColor: '#007BFF',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  slotText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
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
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
       },
    emptyStateText: {
        color: '#AAAAAA',
        fontSize: 18,
        textAlign: 'center',
       },
});

export default ParkingAreaScreen;
