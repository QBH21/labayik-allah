import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../../src/constants/theme';
import { useHajjType } from '../../../src/context/HajjTypeContext';
import { useChecklist } from '../../../src/context/ChecklistContext';
import Badge from '../../../src/components/ui/Badge';
import ProgressBar from '../../../src/components/ui/ProgressBar';

export default function GuideScreen() {
  const { hajjTypeData, steps } = useHajjType();
  const { isStepCompleted, toggleStep } = useChecklist();
  const router = useRouter();

  if (!hajjTypeData) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="book-outline" size={64} color={Colors.goldLight} />
        <Text style={styles.emptyTitle}>No Hajj Type Selected</Text>
        <Text style={styles.emptySubtitle}>Go back to choose your Hajj type</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.backButtonText}>Choose Hajj Type</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>{hajjTypeData.name}</Text>
        <Text style={styles.headerSubtitle}>{hajjTypeData.subtitle}</Text>
      </View>

      {steps.map((part, partIndex) => {
        const completedCount = part.steps.filter((s) => isStepCompleted(s.id)).length;
        const progress = part.steps.length > 0 ? (completedCount / part.steps.length) * 100 : 0;

        return (
          <Animated.View
            key={part.id}
            entering={FadeInDown.duration(400).delay(partIndex * 150)}
          >
            {/* Part Header */}
            <View style={styles.partHeader}>
              <Text style={styles.partTitle}>{part.title}</Text>
              {part.subtitle && (
                <Text style={styles.partSubtitle}>{part.subtitle}</Text>
              )}
              <View style={styles.partProgressRow}>
                <Text style={styles.partProgressText}>
                  {completedCount}/{part.steps.length} steps
                </Text>
              </View>
              <ProgressBar progress={progress} showPercentage={false} height={4} />
            </View>

            {/* Steps */}
            {part.steps.map((step, stepIndex) => {
              const completed = isStepCompleted(step.id);
              return (
                <Animated.View
                  key={step.id}
                  entering={FadeInDown.duration(300).delay(partIndex * 150 + stepIndex * 50)}
                >
                  <TouchableOpacity
                    style={[styles.stepCard, completed && styles.stepCardCompleted]}
                    onPress={() => router.push(`/(tabs)/guide/${step.id}`)}
                    activeOpacity={0.7}
                  >
                    {/* Step Number */}
                    <View style={[styles.stepNumber, completed && styles.stepNumberCompleted]}>
                      {completed ? (
                        <Ionicons name="checkmark" size={16} color={Colors.white} />
                      ) : (
                        <Text style={styles.stepNumberText}>{step.stepNumber}</Text>
                      )}
                    </View>

                    {/* Step Content */}
                    <View style={styles.stepContent}>
                      <View style={styles.stepHeaderRow}>
                        <Text
                          style={[styles.stepTitle, completed && styles.stepTitleCompleted]}
                          numberOfLines={2}
                        >
                          {step.shortTitle}
                        </Text>
                        <Badge classification={step.classification} />
                      </View>
                      {step.dayLabel && (
                        <Text style={styles.dayLabel}>{step.dayLabel}</Text>
                      )}
                      <Text style={styles.stepDescription} numberOfLines={2}>
                        {step.description}
                      </Text>
                    </View>

                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
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
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  backButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.gold,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  headerCard: {
    backgroundColor: Colors.charcoal,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gold,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.goldLight,
    marginTop: 4,
  },
  partHeader: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  partTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  partSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  partProgressRow: {
    marginTop: Spacing.sm,
    marginBottom: 6,
  },
  partProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.card,
  },
  stepCardCompleted: {
    opacity: 0.75,
    backgroundColor: '#FAFAF5',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepNumberCompleted: {
    backgroundColor: Colors.gold,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.goldDark,
  },
  stepContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  stepTitleCompleted: {
    color: Colors.textMuted,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.gold,
    marginTop: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 17,
  },
});
