import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { comparisonData } from '../../../src/data/comparison';

export default function ComparisonScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Quick Comparison</Text>
      <Text style={styles.headerSubtitle}>Three Types of Hajj side by side</Text>

      {/* Table Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.tableHeader}>
        <View style={styles.featureCol}>
          <Text style={styles.colHeaderText}>Feature</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.colHeaderText}>Ifrad</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.colHeaderText}>Qiran</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.colHeaderText}>Tamattu'</Text>
        </View>
      </Animated.View>

      {/* Table Rows */}
      {comparisonData.map((row, index) => (
        <Animated.View
          key={row.feature}
          entering={FadeInDown.duration(300).delay(index * 50)}
          style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}
        >
          <View style={styles.featureCol}>
            <Text style={styles.featureText}>{row.feature}</Text>
          </View>
          <View style={styles.typeCol}>
            <Text style={styles.valueText}>{row.ifrad}</Text>
          </View>
          <View style={styles.typeCol}>
            <Text style={styles.valueText}>{row.qiran}</Text>
          </View>
          <View style={styles.typeCol}>
            <Text style={styles.valueText}>{row.tamattu}</Text>
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
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.charcoal,
    borderTopLeftRadius: BorderRadius.md,
    borderTopRightRadius: BorderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  featureCol: {
    flex: 1.2,
    paddingHorizontal: 4,
  },
  typeCol: {
    flex: 1,
    paddingHorizontal: 4,
  },
  colHeaderText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tableRowAlt: {
    backgroundColor: Colors.ivory,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 18,
  },
  valueText: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
