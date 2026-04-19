import { Stack } from 'expo-router';
import { Colors } from '../../../src/constants/theme';

export default function ReferenceLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.charcoal },
        headerTintColor: Colors.gold,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Reference' }} />
      <Stack.Screen name="tips" options={{ headerTitle: 'Practical Tips' }} />
      <Stack.Screen name="dates" options={{ headerTitle: 'Key Dates' }} />
      <Stack.Screen name="comparison" options={{ headerTitle: 'Compare Types' }} />
      <Stack.Screen name="mistakes" options={{ headerTitle: 'Common Mistakes' }} />
    </Stack>
  );
}
