import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { useHajjType } from '../../../src/context/HajjTypeContext';
import { useChecklist } from '../../../src/context/ChecklistContext';
import Badge from '../../../src/components/ui/Badge';

export default function StepDetailScreen() {
  const { stepId } = useLocalSearchParams<{ stepId: string }>();
  const { steps } = useHajjType();
  const { isStepCompleted, toggleStep } = useChecklist();

  const allSteps = steps.flatMap((part) => part.steps);
  const step = allSteps.find((s) => s.id === stepId);
  const stepIndex = allSteps.findIndex((s) => s.id === stepId);
  const completed = step ? isStepCompleted(step.id) : false;

  if (!step) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Step not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Step Header */}
      <View style={styles.headerSection}>
        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorText}>
            Step {stepIndex + 1} of {allSteps.length}
          </Text>
        </View>
        <Badge classification={step.classification} size="md" />
        <Text style={styles.title}>{step.title}</Text>
        {step.dayLabel && (
          <View style={styles.dayBadge}>
            <Ionicons name="calendar-outline" size={14} color={Colors.gold} />
            <Text style={styles.dayBadgeText}>{step.dayLabel}</Text>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Description */}
      <View style={styles.descriptionCard}>
        <Text style={styles.sectionLabel}>INSTRUCTIONS</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>

      {/* Classification Info */}
      <View style={styles.infoCard}>
        <Ionicons
          name={
            step.classification === 'FARD'
              ? 'alert-circle'
              : step.classification === 'WAJIB'
              ? 'warning'
              : step.classification === 'SUNNAH'
              ? 'star'
              : 'information-circle'
          }
          size={20}
          color={
            step.classification === 'FARD'
              ? Colors.fard
              : step.classification === 'WAJIB'
              ? Colors.wajib
              : Colors.sunnah
          }
        />
        <Text style={styles.infoText}>
          {step.classification === 'FARD'
            ? 'This is FARD (obligatory). Hajj is INVALID if omitted. Cannot be compensated.'
            : step.classification === 'WAJIB'
            ? 'This is WAJIB (obligatory). If missed, a Dam (sacrifice of a sheep/goat) is required, but Hajj remains valid.'
            : step.classification === 'SUNNAH'
            ? 'This is SUNNAH (recommended). No penalty for omission, but great reward for performance.'
            : 'See classification details.'}
        </Text>
      </View>

      {/* Tips if present */}
      {step.tips && step.tips.length > 0 && (
        <View style={styles.tipsSection}>
          <Text style={styles.sectionLabel}>TIPS</Text>
          {step.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Ionicons name="bulb-outline" size={16} color={Colors.gold} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Mark Complete Button */}
      <TouchableOpacity
        style={[styles.completeButton, completed && styles.completeButtonDone]}
        onPress={() => toggleStep(step.id)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={22}
          color={completed ? Colors.white : Colors.gold}
        />
        <Text style={[styles.completeButtonText, completed && styles.completeButtonTextDone]}>
          {completed ? 'Completed' : 'Mark as Complete'}
        </Text>
      </TouchableOpacity>

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
    padding: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  headerSection: {
    gap: Spacing.sm,
  },
  stepIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldMuted,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.goldDark,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    lineHeight: 32,
    marginTop: Spacing.xs,
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.xs,
  },
  dayBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gold,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  descriptionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 26,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.goldMuted,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tipsSection: {
    marginTop: Spacing.lg,
  },
  tipRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.gold,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    marginTop: Spacing.xl,
    ...Shadows.card,
  },
  completeButtonDone: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gold,
  },
  completeButtonTextDone: {
    color: Colors.white,
  },
});
