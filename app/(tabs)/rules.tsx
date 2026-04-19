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
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useHajjType } from '../../src/context/HajjTypeContext';
import { ihramSections } from '../../src/data/ihramRules';
import { prohibitedActs } from '../../src/data/prohibitedActs';
import Badge from '../../src/components/ui/Badge';

type TabType = 'ihram' | 'prohibited';

export default function RulesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('ihram');
  const { selectedType } = useHajjType();

  const applicableProhibited = selectedType
    ? prohibitedActs.filter((p) => p.hajjType === selectedType)
    : prohibitedActs;

  return (
    <View style={styles.screen}>
      {/* Tab Selector */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ihram' && styles.tabActive]}
          onPress={() => setActiveTab('ihram')}
        >
          <Text style={[styles.tabText, activeTab === 'ihram' && styles.tabTextActive]}>
            Ihram Rules
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'prohibited' && styles.tabActive]}
          onPress={() => setActiveTab('prohibited')}
        >
          <Text style={[styles.tabText, activeTab === 'prohibited' && styles.tabTextActive]}>
            Prohibited Acts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'ihram' ? (
          <>
            {ihramSections.map((section, sIndex) => (
              <Animated.View
                key={section.id}
                entering={FadeInDown.duration(400).delay(sIndex * 100)}
              >
                <View style={styles.sectionHeader}>
                  <Badge classification={section.classification} size="md" />
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>

                {section.description && (
                  <View style={styles.descriptionBox}>
                    <Ionicons name="information-circle-outline" size={16} color={Colors.wajib} />
                    <Text style={styles.descriptionText}>{section.description}</Text>
                  </View>
                )}

                {section.rules.map((rule, rIndex) => (
                  <Animated.View
                    key={rule.id}
                    entering={FadeInDown.duration(300).delay(sIndex * 100 + rIndex * 40)}
                  >
                    <View style={[
                      styles.ruleCard,
                      rule.classification === 'HARAM' && styles.ruleCardHaram,
                    ]}>
                      <View style={[
                        styles.ruleIcon,
                        { backgroundColor: rule.classification === 'HARAM' ? Colors.haramBg : Colors.sunnahBg },
                      ]}>
                        <Text style={styles.ruleNumber}>{rIndex + 1}</Text>
                      </View>
                      <Text style={styles.ruleText}>{rule.text}</Text>
                    </View>
                  </Animated.View>
                ))}
              </Animated.View>
            ))}
          </>
        ) : (
          <>
            {applicableProhibited.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  Select a Hajj type to see specific prohibited acts
                </Text>
              </View>
            ) : (
              applicableProhibited.map((section, sIndex) => (
                <Animated.View
                  key={section.id}
                  entering={FadeInDown.duration(400).delay(sIndex * 100)}
                >
                  <View style={styles.sectionHeader}>
                    <Badge classification="HARAM" size="md" />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>

                  {section.items.map((item, iIndex) => (
                    <View key={iIndex} style={styles.prohibitedCard}>
                      <View style={styles.prohibitedIcon}>
                        <Ionicons name="close-circle" size={18} color={Colors.haram} />
                      </View>
                      <Text style={styles.prohibitedText}>{item}</Text>
                    </View>
                  ))}
                </Animated.View>
              ))
            )}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    backgroundColor: Colors.ivory,
  },
  tabActive: {
    backgroundColor: Colors.gold,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  content: {
    padding: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  descriptionBox: {
    flexDirection: 'row',
    backgroundColor: Colors.wajibBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  descriptionText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  ruleCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    ...Shadows.card,
  },
  ruleCardHaram: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.haram,
  },
  ruleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  prohibitedCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.haram,
    ...Shadows.card,
  },
  prohibitedIcon: {
    marginTop: 2,
  },
  prohibitedText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
