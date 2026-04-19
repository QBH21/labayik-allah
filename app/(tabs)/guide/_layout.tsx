import { Stack } from 'expo-router';
import { Colors } from '../../../src/constants/theme';

export default function GuideLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.charcoal },
        headerTintColor: Colors.gold,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Step-by-Step Guide' }} />
      <Stack.Screen
        name="[stepId]"
        options={{ headerTitle: 'Step Detail' }}
      />
    </Stack>
  );
}
