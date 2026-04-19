import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { commonMistakes } from '../../../src/data/mistakes';

export default function MistakesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Common Mistakes & Bid'aat</Text>
      <Text style={styles.headerSubtitle}>
        Practices to avoid — protect the validity and reward of your Hajj
      </Text>

      {commonMistakes.map((mistake, index) => (
        <Animated.View
          key={mistake.id}
          entering={FadeInDown.duration(400).delay(index * 60)}
        >
          <View style={styles.mistakeCard}>
            {/* Incorrect */}
            <View style={styles.incorrectSection}>
              <View style={styles.iconRow}>
                <Ionicons name="close-circle" size={18} color={Colors.haram} />
                <Text style={styles.sectionLabel}>INCORRECT</Text>
              </View>
              <Text style={styles.incorrectText}>{mistake.incorrectPractice}</Text>
            </View>

            {/* Divider with arrow */}
            <View style={styles.arrowDivider}>
              <View style={styles.dividerLine} />
              <Ionicons name="arrow-down" size={18} color={Colors.sunnah} />
              <View style={styles.dividerLine} />
            </View>

            {/* Correct */}
            <View style={styles.correctSection}>
              <View style={styles.iconRow}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.sunnah} />
                <Text style={styles.correctLabel}>CORRECT</Text>
              </View>
              <Text style={styles.correctText}>{mistake.correction}</Text>
            </View>
          </View>
        </Animated.View>
      ))}

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
    lineHeight: 20,
  },
  mistakeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  incorrectSection: {
    backgroundColor: Colors.haramBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.haram,
    letterSpacing: 1,
  },
  incorrectText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 21,
  },
  arrowDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  correctSection: {
    backgroundColor: Colors.sunnahBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  correctLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.sunnah,
    letterSpacing: 1,
  },
  correctText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 21,
  },
});
