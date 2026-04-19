import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useHajjType } from '../../src/context/HajjTypeContext';
import { useChecklist } from '../../src/context/ChecklistContext';
import { checklistData } from '../../src/data/checklist';
import Badge from '../../src/components/ui/Badge';
import ProgressBar from '../../src/components/ui/ProgressBar';

export default function ChecklistScreen() {
  const { selectedType, hajjTypeData } = useHajjType();
  const { isItemChecked, toggleItem, getItemNotes, updateNotes, getProgress, resetAll } = useChecklist();
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  if (!selectedType || !hajjTypeData) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="checkbox-outline" size={64} color={Colors.goldLight} />
        <Text style={styles.emptyTitle}>No Hajj Type Selected</Text>
        <Text style={styles.emptySubtitle}>Select a Hajj type from the home screen first</Text>
      </View>
    );
  }

  const applicableCategories = checklistData.filter((cat) =>
    cat.applicableTo.includes(selectedType)
  );
  const progress = getProgress(selectedType);
  const overallPercent = progress.totalTotal > 0 ? (progress.totalDone / progress.totalTotal) * 100 : 0;

  const handleReset = () => {
    Alert.alert(
      'Reset Checklist',
      'This will clear all checked items and notes. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetAll },
      ]
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Overall Progress */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.overallCard}>
        <Text style={styles.overallTitle}>{hajjTypeData.name}</Text>
        <ProgressBar
          progress={overallPercent}
          label="Overall Completion"
          color={Colors.gold}
        />
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.fard }]}>{progress.fardDone}/{progress.fardTotal}</Text>
            <Text style={styles.statLabel}>Fard</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.wajib }]}>{progress.wajibDone}/{progress.wajibTotal}</Text>
            <Text style={styles.statLabel}>Wajib</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: Colors.gold }]}>{progress.totalDone}/{progress.totalTotal}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </Animated.View>

      {/* Categories */}
      {applicableCategories.map((category, catIndex) => {
        const catCompleted = category.items.filter((item) => isItemChecked(item.id)).length;
        return (
          <Animated.View
            key={category.id}
            entering={FadeInDown.duration(400).delay(catIndex * 100)}
          >
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleRow}>
                <Badge classification={category.classification} size="md" />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              <Text style={styles.categoryCount}>
                {catCompleted}/{category.items.length} complete
              </Text>
            </View>

            {/* Items */}
            {category.items.map((item) => {
              const checked = isItemChecked(item.id);
              const notes = getItemNotes(item.id);
              const isExpanded = expandedNotes === item.id;

              return (
                <View key={item.id} style={[styles.itemCard, checked && styles.itemCardChecked]}>
                  <TouchableOpacity
                    style={styles.itemRow}
                    onPress={() => toggleItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                      {checked && <Ionicons name="checkmark" size={16} color={Colors.white} />}
                    </View>
                    <Text style={[styles.itemLabel, checked && styles.itemLabelChecked]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>

                  {/* Notes toggle */}
                  <TouchableOpacity
                    style={styles.notesToggle}
                    onPress={() => setExpandedNotes(isExpanded ? null : item.id)}
                  >
                    <Ionicons
                      name={notes ? 'document-text' : 'document-text-outline'}
                      size={14}
                      color={notes ? Colors.gold : Colors.textMuted}
                    />
                    <Text style={[styles.notesToggleText, notes ? { color: Colors.gold } : undefined]}>
                      {isExpanded ? 'Hide Notes' : notes ? 'View Notes' : 'Add Notes'}
                    </Text>
                  </TouchableOpacity>

                  {isExpanded && (
                    <TextInput
                      style={styles.notesInput}
                      placeholder="Add your notes here..."
                      placeholderTextColor={Colors.textMuted}
                      value={notes}
                      onChangeText={(text) => updateNotes(item.id, text)}
                      multiline
                    />
                  )}
                </View>
              );
            })}
          </Animated.View>
        );
      })}

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="refresh-outline" size={18} color={Colors.error} />
        <Text style={styles.resetText}>Reset All</Text>
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
    textAlign: 'center',
  },
  overallCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  overallTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  categoryHeader: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  itemCardChecked: {
    backgroundColor: '#FAFAF5',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 21,
    fontWeight: '500',
  },
  itemLabelChecked: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  notesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
    paddingLeft: 40,
  },
  notesToggleText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: Colors.ivory,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
    marginLeft: 40,
    fontSize: 13,
    color: Colors.text,
    minHeight: 50,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    paddingVertical: 12,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
});
