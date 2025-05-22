import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, createContext, useContext } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native'; // Import StyleSheet

import { useColorScheme } from '../hooks/useColorScheme';

// Define the Auth context type
interface AuthContextType {
  isAuthenticated: boolean | null;
  setAuthenticated: (val: boolean | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
   // Add a logout function to the context
   signOut: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// AuthProvider component to manage authentication state
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for token in AsyncStorage on mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setAuthenticated(!!token); // Set authenticated based on token presence
      } catch (error) {
        console.error('Error checking token:', error);
        setAuthenticated(false); // Assume not authenticated on error
      } finally {
        setLoading(false); // Stop loading after check
      }
    };

    checkToken();
  }, []); // Empty dependency array means this runs only once on mount

  // Sign in function (using fetch - consider switching to Axios for consistency)
  const signIn = async (email: string, password: string) => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://your-api.com/login', { // Replace with your login API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) { // Assuming API returns { token: '...' } on success
        await AsyncStorage.setItem('token', data.token); // Store the token
        setAuthenticated(true); // Update auth state
      } else {
         // Assuming API returns { message: '...' } on failure
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
     
      throw err; // Re-throw the error to be handled by the caller (e.g., LoginScreen)
    }
  };

  // Sign out function
  const signOut = async () => {
      try {
          await AsyncStorage.removeItem('token'); // Remove the token
          setAuthenticated(false); // Update auth state
      } catch (error) {
          console.error('Error signing out:', error);
          // Even if removing fails, set authenticated to false
          setAuthenticated(false);
      }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, signIn, signOut }}>
       {/* Only show loading indicator here while the initial token check is happening */}
      {loading ? (
        <View style={styles.loadingOverlay}> {/* Use a styled View */}
          <ActivityIndicator size="large" color="#007BFF" /> {/* Blue spinner */}
        </View>
      ) : (
         // Render children (the rest of your app's navigation stack)
        children
      )}
    </AuthContext.Provider>
  );
}

// Main RootLayout component
export default function RootLayout() {
  const colorScheme = useColorScheme(); // Hook to get system color scheme
  const [loaded] = useFonts({ // Load custom fonts
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), // Example font
    // Add other fonts here
  });

  // Effect to hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]); // Depend on loaded state

  // Don't render anything until fonts are loaded
  if (!loaded) {
    return null;
  }

  // Provide the theme and AuthProvider to the rest of the app
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider> {/* Wrap the main stack navigator with AuthProvider */}
        <RootStackNavigator />
      </AuthProvider>
      <StatusBar style="auto" /> {/* Manage status bar style */}
    </ThemeProvider>
  );
}

// Stack Navigator that handles routing based on authentication state
function RootStackNavigator() {
  const { isAuthenticated } = useAuth(); // Get auth state and loading from context
  const router = useRouter(); // Get router instance

  // Effect to handle navigation based on authentication state
  useEffect(() => {
    // Only navigate once the authentication status is definitively known (not null)
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        // If authenticated, redirect to the admin dashboard
        console.log("Authenticated, redirecting to /admin/dashboard");
        router.replace('/admin/dashboard');
      } else {
        // If not authenticated, redirect to the login screen
         console.log("Not authenticated, redirecting to /auth/login");
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, router]); // Depend on isAuthenticated and router

   // Show a loading indicator while the authentication status is being determined
   // This prevents rendering the wrong screen momentarily
   if (isAuthenticated === null) {
       return (
           <View style={styles.loadingOverlay}> {/* Use a styled View */}
               <ActivityIndicator size="large" color="#007BFF" /> {/* Blue spinner */}
           </View>
       );
   }


  // Render the appropriate stack based on authentication state
  return (
    <Stack>
      {isAuthenticated ? (
       
         <>
            {/* Define your protected routes here */}
            <Stack.Screen name="(admin)" options={{ headerShown: false }} /> {/* Example: Admin routes group */}
            {/* Add other protected routes if not in a group */}
            {/* Example: <Stack.Screen name="admin/dashboard" options={{ headerShown: false }} /> */}
            {/* Example: <Stack.Screen name="admin/bookings" options={{ headerShown: false }} /> */}
            {/* ... other admin screens ... */}
         </>
      ) : (
        // If not authenticated, render the authentication routes
        <>
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
           {/* You might want to set the initialRouteName for the auth stack if needed */}
           {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} initialRouteName="login" /> */}
        </>
      )}
      {/* Catch-all for unmatched routes */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

const styles = StyleSheet.create({
    loadingOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Black background for loading screen
    },
    // Add other global styles if needed
});


