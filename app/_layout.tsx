import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { HajjTypeProvider } from '../src/context/HajjTypeContext';
import { ChecklistProvider } from '../src/context/ChecklistContext';
import AuthScreen from './auth';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar style="light" />
        <AuthScreen />
      </>
    );
  }

  return (
    <HajjTypeProvider>
      <ChecklistProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ChecklistProvider>
    </HajjTypeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
