import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { keyDates } from '../../../src/data/keyDates';

export default function DatesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Dhul Hijjah Timeline</Text>
      <Text style={styles.headerSubtitle}>Key dates during the Hajj season</Text>

      <View style={styles.timeline}>
        {keyDates.map((date, index) => (
          <Animated.View
            key={date.id}
            entering={FadeInDown.duration(300).delay(index * 60)}
            style={styles.timelineItem}
          >
            {/* Timeline dot and line */}
            <View style={styles.timelineLeft}>
              <View style={[
                styles.dot,
                date.isHighlight ? styles.dotHighlight : styles.dotNormal,
              ]} />
              {index < keyDates.length - 1 && <View style={styles.line} />}
            </View>

            {/* Content */}
            <View style={[
              styles.timelineCard,
              date.isHighlight && styles.timelineCardHighlight,
            ]}>
              <Text style={styles.dateLabel}>{date.date}</Text>
              <Text style={[styles.dayName, date.isHighlight && styles.dayNameHighlight]}>
                {date.dayName}
              </Text>
              <Text style={styles.keyActs}>{date.keyActs}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  content: {
    padding: Spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  timeline: {
    paddingLeft: Spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 80,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 6,
    zIndex: 1,
  },
  dotHighlight: {
    backgroundColor: Colors.gold,
    borderWidth: 3,
    borderColor: Colors.goldLight,
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  dotNormal: {
    backgroundColor: Colors.border,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.borderLight,
    marginTop: -2,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginLeft: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  timelineCardHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.gold,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  dayNameHighlight: {
    color: Colors.goldDark,
  },
  keyActs: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
});
