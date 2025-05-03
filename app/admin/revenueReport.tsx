import react, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Define the RevenueItem interface
type RevenueItem = {
  id: number;
  date: string;
  revenue: number;
};

const RevenueReport = () => {
  const [reportData, setReportData] = useState<RevenueItem[]>([]); // Typed as an array of RevenueItem
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueReport = async () => {
      try {
        const response = await axios.get('https://smart-parking-backend-ten.vercel.app/api/revenue-report');
        setReportData(response.data);
      } catch (error) {
        console.error('Failed to fetch revenue report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueReport();
  }, []);

  return ( 
  <div>
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Report</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={reportData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: RevenueItem }) => ( // Explicitly type 'item' as RevenueItem
            <View style={styles.card}>
              <Text style={styles.text}>Date: {item.date}</Text>
              <Text style={styles.text}>Total Revenue: Rs. {item.revenue}</Text>
            </View>
          )}
        />
      )}
    </View>
    </div>
  );
};

export default RevenueReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    padding: 15, marginBottom: 10,
    backgroundColor: '#f1f1f1', borderRadius: 8,
  },
  text: { fontSize: 16 },
});
