import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { useHajjType } from '../../../src/context/HajjTypeContext';
import { tipCategories } from '../../../src/data/tips';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export default function TipsScreen() {
  const { selectedType } = useHajjType();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const universalTips = tipCategories.filter((cat) => !cat.hajjType);
  const typeTips = selectedType
    ? tipCategories.filter((cat) => cat.hajjType === selectedType)
    : [];

  const allSections = [...universalTips, ...typeTips];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {allSections.map((category, catIndex) => {
        const isExpanded = expandedSection === category.id;
        return (
          <Animated.View
            key={category.id}
            entering={FadeInDown.duration(400).delay(catIndex * 60)}
          >
            <TouchableOpacity
              style={[styles.sectionCard, isExpanded && styles.sectionCardExpanded]}
              onPress={() => setExpandedSection(isExpanded ? null : category.id)}
              activeOpacity={0.8}
            >
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconRow}>
                  <Ionicons name={category.icon as IoniconsName} size={22} color={Colors.gold} />
                  <Text style={styles.sectionTitle}>{category.title}</Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.textMuted}
                />
              </View>

              {!isExpanded && (
                <Text style={styles.tipPreview}>
                  {category.tips.length} tips
                </Text>
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.tipsContainer}>
                {category.tips.map((tip, tipIndex) => (
                  <Animated.View
                    key={tipIndex}
                    entering={FadeInDown.duration(200).delay(tipIndex * 30)}
                  >
                    <View style={styles.tipCard}>
                      <View style={styles.tipBullet}>
                        <View style={styles.bulletDot} />
                      </View>
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  </Animated.View>
                ))}
              </View>
            )}
          </Animated.View>
        );
      })}

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
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  sectionCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  tipPreview: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
    marginLeft: 34,
  },
  tipsContainer: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    ...Shadows.card,
  },
  tipCard: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  tipBullet: {
    marginTop: 7,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
