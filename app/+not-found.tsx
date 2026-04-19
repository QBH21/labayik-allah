import { Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../src/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
