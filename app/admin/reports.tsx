import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList, 
  ActivityIndicator,
  SafeAreaView, 
  ScrollView, 
} from 'react-native';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Ionicons } from '@expo/vector-icons'; 



// Interface for Occupancy Report data items
interface OccupancyItem {
  areaId: string;
  areaName: string;
  occupied: number;
  total: number;

}

// Interface for Revenue Report data items
interface RevenueItem {
  reportId: string; 
  date: string; 
  amount: number; 
  description?: string; 
}

// Define interface for your API response structures

interface OccupancyReportApiResponse {
  success: boolean; // Assuming a success flag
  data: OccupancyItem[]; // Array of occupancy items
  message?: string; // Optional message
}

interface RevenueReportApiResponse {
  success: boolean; // Assuming a success flag
  data: RevenueItem[]; // Array of revenue items
  message?: string; // Optional message
}

// Define the types for the report categories
type ReportCategory = 'occupancy' | 'revenue' | null; 

const { width } = Dimensions.get('window');

const boxMargin = 10; 
const containerPadding = 16 * 2; 
const boxSize = (width - containerPadding - (boxMargin * 2)) / 2;


const ReportScreen = () => {
  
  const [selectedReport, setSelectedReport] = useState<ReportCategory>(null);
  // State to hold the data for the currently selected report
  const [reportData, setReportData] = useState<OccupancyItem[] | RevenueItem[]>([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching report data
  const [error, setError] = useState('');

  // Function to handle report box selection
  const handleReportSelect = useCallback(async (category: ReportCategory) => {
    setSelectedReport(category); 
    setReportData([]); 
    setLoading(true); 
    setError(''); 

   
    console.log(`Simulating fetching ${category} report...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    if (category === 'occupancy') {
      const dummyOccupancyData: OccupancyItem[] = [
        { areaId: '1', areaName: 'NSTP Parking', occupied: 15, total: 20 },
        { areaId: '2', areaName: 'SEECS Parking', occupied: 8, total: 10 },
        { areaId: '3', areaName: 'Library Parking', occupied: 3, total: 15 },
        { areaId: '4', areaName: 'Admin Area Parking', occupied: 25, total: 30 },
         
      ];
      setReportData(dummyOccupancyData);
    } else if (category === 'revenue') {
       const dummyRevenueData: RevenueItem[] = [
           { reportId: 'rev1', date: '2025-05-01', amount: 150.50, description: 'Parking fees May 1' },
           { reportId: 'rev2', date: '2025-05-02', amount: 210.00, description: 'Parking fees May 2' },
           { reportId: 'rev3', date: '2025-05-03', amount: 185.75, description: 'Parking fees May 3' },
           { reportId: 'rev4', date: '2025-05-04', amount: 300.00, description: 'Parking fees May 4' },
           
       ];
       setReportData(dummyRevenueData);
    }
     setError(''); 
    setLoading(false);
    

  }, []); 

  
  const renderReportItem = ({ item }: { item: OccupancyItem | RevenueItem }) => {
    if (selectedReport === 'occupancy') {
      const occupancyItem = item as OccupancyItem; // Cast to OccupancyItem
      // Calculate utilization percentage
      const utilization = occupancyItem.total > 0 ? ((occupancyItem.occupied / occupancyItem.total) * 100).toFixed(1) : '0.0';
      return (
        <View style={styles.reportItemCard}> {/* Use card style for list items */}
           <View style={styles.reportItemHeader}>
              <Ionicons name="pie-chart-outline" size={20} color="#007BFF" /> {/* Icon */}
              <Text style={styles.reportItemTitle}>Occupancy for {occupancyItem.areaName}</Text>
           </View>
           <View style={styles.reportItemDetails}>
              <Text style={styles.reportItemText}>Occupied Slots: {occupancyItem.occupied}</Text>
              <Text style={styles.reportItemText}>Total Slots: {occupancyItem.total}</Text>
              <Text style={styles.reportItemText}>Utilization: {utilization}%</Text>
           </View>
        </View>
      );
    } else if (selectedReport === 'revenue') {
      const revenueItem = item as RevenueItem; 
       // Format date and amount for better display
       const formattedDate = new Date(revenueItem.date).toLocaleDateString();
       const formattedAmount = `$${revenueItem.amount.toFixed(2)}`;
      return (
        <View style={styles.reportItemCard}> {/* Use card style for list items */}
           <View style={styles.reportItemHeader}>
               <Ionicons name="cash-outline" size={20} color="#007BFF" /> {/* Icon */}
               <Text style={styles.reportItemTitle}>Revenue on {formattedDate}</Text>
           </View>
           <View style={styles.reportItemDetails}>
               <Text style={styles.reportItemText}>Amount: {formattedAmount}</Text>
               {revenueItem.description && <Text style={styles.reportItemText}>Description: {revenueItem.description}</Text>}
           </View>
        </View>
      );
    }
    return null; 
  };

  
  const handleBackToReports = () => {
      setSelectedReport(null); // Reset
      setReportData([]); 
      setError(''); 
  };


  return (
    <SafeAreaView style={styles.safeArea}> {/* Use SafeAreaView */}
      <View style={styles.container}>
        <Text style={styles.header}>Reports</Text>

        {/* Show report type boxes if no report is selected */}
        {!selectedReport && (
          <View style={styles.boxesContainer}>
            <TouchableOpacity
              style={styles.reportBox}
              onPress={() => handleReportSelect('occupancy')}
            >
              <View style={styles.reportBoxIconContainer}>
                 <Ionicons name="stats-chart-outline" size={40} color="#fff" /> {/* Icon */}
              </View>
              <Text style={styles.reportBoxTitle}>Occupancy Report</Text>
              <Text style={styles.reportBoxDescription}>View parking area utilization.</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reportBox}
              onPress={() => handleReportSelect('revenue')}
            >
               <View style={styles.reportBoxIconContainer}>
                 <Ionicons name="cash-outline" size={40} color="#fff" /> {/* Icon */}
               </View>
              <Text style={styles.reportBoxTitle}>Revenue Report</Text>
              <Text style={styles.reportBoxDescription}>Track parking fee revenue.</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Show selected report details */}
        {selectedReport && (
          <View style={styles.reportDetailsContainer}>
             {/* Back Button */}
             <TouchableOpacity style={styles.backButton} onPress={handleBackToReports}>
                  <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
                  <Text style={styles.backButtonText}> Back to Reports</Text>
             </TouchableOpacity>

             <Text style={styles.reportTitle}>
                 {selectedReport === 'occupancy' ? 'Occupancy Report Details' : 'Revenue Report Details'}
             </Text>

            {loading ? (
              <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <FlatList
                data={reportData}
                // Use a key that exists on both OccupancyItem and RevenueItem, or provide a custom keyExtractor
                keyExtractor={(item, index) => {
                    
                    if (selectedReport === 'occupancy') return (item as OccupancyItem).areaId.toString();
                    if (selectedReport === 'revenue') return (item as RevenueItem).reportId.toString();
                    return index.toString(); //  if IDs are missing
                }}
                renderItem={renderReportItem}
                contentContainerStyle={styles.reportList}
                ListEmptyComponent={() => (
                   <View style={styles.emptyListContainer}>
                      <Text style={styles.emptyListText}>No data found for this report.</Text>
                   </View>
                )}
              />
            )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF', 
    marginTop: 10,
  },
  boxesContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginHorizontal: -boxMargin, 
    marginVertical: -boxMargin, 
  },
  reportBox: { 
    width: boxSize,
    aspectRatio: 1, 
    backgroundColor: '#1A1A1A', 
    borderRadius: 12, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: boxMargin, 
    borderWidth: 1,
    borderColor: '#007BFF',
    padding: 15, 
  },
   reportBoxIconContainer: {
       width: 60,
       height: 60,
       borderRadius: 30, 
       backgroundColor: "#007BFF", 
       justifyContent: "center",
       alignItems: "center",
       marginBottom: 10, 
   },
  reportBoxTitle: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
   reportBoxDescription: {
       color: '#AAAAAA', 
       fontSize: 12,
       textAlign: 'center',
   },
  reportDetailsContainer: {
      flex: 1, 
  },
  backButton: {
      marginBottom: 15,
      paddingVertical: 5,
      flexDirection: 'row', 
      alignItems: 'center',
      alignSelf: 'flex-start', 
  },
  backButtonText: {
      color: '#007BFF', 
      fontSize: 16,
      marginLeft: 5,
  },
  reportTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF', 
      textAlign: 'center',
      marginBottom: 15,
  },
  loadingIndicator: {
      marginTop: 20,
  },
  errorText: {
    color: '#FF0000', 
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  reportList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  reportItemCard: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 12, 
    borderLeftWidth: 4,
    borderLeftColor: '#007BFF', 
  },
   reportItemHeader: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 8,
   },
   reportItemTitle: {
       fontSize: 16,
       fontWeight: 'bold',
       color: '#FFFFFF', 
       marginLeft: 10,
   },
   reportItemDetails: {
       // Container for detail text
   },
  reportItemText: {
    color: '#AAAAAA',
    fontSize: 13,
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

export default ReportScreen;
