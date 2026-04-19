import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const cards: { title: string; subtitle: string; icon: IoniconsName; route: string; color: string }[] = [
  {
    title: 'Key Dates',
    subtitle: 'Dhul Hijjah timeline',
    icon: 'calendar-outline',
    route: '/(tabs)/reference/dates',
    color: '#1A6B5A',
  },
  {
    title: 'Practical Tips',
    subtitle: 'Before travel, health & more',
    icon: 'bulb-outline',
    route: '/(tabs)/reference/tips',
    color: '#B8860B',
  },
  {
    title: 'Compare Types',
    subtitle: 'Ifrad vs Qiran vs Tamattu\'',
    icon: 'git-compare-outline',
    route: '/(tabs)/reference/comparison',
    color: '#6B3FA0',
  },
  {
    title: 'Common Mistakes',
    subtitle: 'Bid\'aat & misunderstandings',
    icon: 'warning-outline',
    route: '/(tabs)/reference/mistakes',
    color: '#C62828',
  },
];

export default function ReferenceHub() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <Animated.View
            key={card.route}
            entering={FadeInDown.duration(400).delay(index * 80)}
            style={styles.cardWrapper}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconCircle, { backgroundColor: card.color + '18' }]}>
                <Ionicons name={card.icon} size={28} color={card.color} />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    padding: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  cardWrapper: {
    width: '47%',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
    ...Shadows.card,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});
