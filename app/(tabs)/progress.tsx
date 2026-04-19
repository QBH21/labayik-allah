import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { cacheDirectory, writeAsStringAsync, readAsStringAsync } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/theme';
import { useHajjType } from '../../src/context/HajjTypeContext';
import { useChecklist } from '../../src/context/ChecklistContext';
import { useAuth } from '../../src/context/AuthContext';
import { exportUserData, importUserData, BackupData } from '../../src/utils/storage';
import ProgressBar from '../../src/components/ui/ProgressBar';

export default function ProgressScreen() {
  const { selectedType, hajjTypeData, steps } = useHajjType();
  const { getProgress, completedSteps } = useChecklist();
  const { logout, username } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Lock App', 'You will need to enter your PIN to access the app again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Lock', style: 'destructive', onPress: logout },
    ]);
  };

  const handleExport = async () => {
    try {
      const data = await exportUserData();
      if (!data) {
        Alert.alert('Error', 'No data to export.');
        return;
      }
      const fileName = `labayik-allah-backup-${username}.json`;
      const filePath = `${cacheDirectory}${fileName}`;
      await writeAsStringAsync(filePath, JSON.stringify(data, null, 2));

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'application/json',
          dialogTitle: 'Export Labayik Allah Data',
        });
      } else {
        Alert.alert('Exported', `Backup saved to ${fileName}`);
      }
    } catch {
      Alert.alert('Error', 'Failed to export data.');
    }
  };

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const file = result.assets[0];
      const content = await readAsStringAsync(file.uri);
      const backup: BackupData = JSON.parse(content);
      const importResult = await importUserData(backup);

      if (importResult.success) {
        Alert.alert(
          'Data Restored',
          `Welcome back, ${backup.account.username}! Your data has been restored. Please restart the app to see your data.`,
          [{ text: 'OK', onPress: logout }]
        );
      } else {
        Alert.alert('Import Failed', importResult.error ?? 'Invalid backup file.');
      }
    } catch {
      Alert.alert('Error', 'Failed to import data. Make sure you selected a valid backup file.');
    }
  };

  if (!selectedType || !hajjTypeData) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="stats-chart-outline" size={64} color={Colors.goldLight} />
        <Text style={styles.emptyTitle}>No Hajj Type Selected</Text>
        <Text style={styles.emptySubtitle}>Select a Hajj type to track progress</Text>

        <View style={styles.transferSection}>
          <Text style={styles.transferTitle}>TRANSFER DATA</Text>
          <TouchableOpacity style={styles.importButton} onPress={handleImport} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={18} color={Colors.gold} />
            <Text style={styles.importButtonText}>Import from Backup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const progress = getProgress(selectedType);
  const overallPercent = progress.totalTotal > 0 ? (progress.totalDone / progress.totalTotal) * 100 : 0;
  const fardPercent = progress.fardTotal > 0 ? (progress.fardDone / progress.fardTotal) * 100 : 0;
  const wajibPercent = progress.wajibTotal > 0 ? (progress.wajibDone / progress.wajibTotal) * 100 : 0;

  const allSteps = steps.flatMap((part) => part.steps);
  const stepsCompleted = allSteps.filter((s) => completedSteps.includes(s.id)).length;
  const stepsPercent = allSteps.length > 0 ? (stepsCompleted / allSteps.length) * 100 : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Overall Ring */}
      <Animated.View entering={FadeInDown.duration(500)} style={styles.overallCard}>
        <View style={styles.ringContainer}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.ringPercent}>{Math.round(overallPercent)}%</Text>
              <Text style={styles.ringLabel}>Overall</Text>
            </View>
          </View>
        </View>
        <Text style={styles.overallTitle}>{hajjTypeData.name}</Text>
        <Text style={styles.overallSubtitle}>Checklist Completion</Text>
      </Animated.View>

      {/* Checklist Breakdown */}
      <Animated.View entering={FadeInDown.duration(400).delay(100)}>
        <Text style={styles.sectionTitle}>CHECKLIST PROGRESS</Text>

        <View style={styles.card}>
          <ProgressBar
            progress={fardPercent}
            color={Colors.fard}
            label={`Fard Acts — ${progress.fardDone}/${progress.fardTotal}`}
          />
          <View style={{ height: Spacing.md }} />
          <ProgressBar
            progress={wajibPercent}
            color={Colors.wajib}
            label={`Wajib Acts — ${progress.wajibDone}/${progress.wajibTotal}`}
          />
        </View>
      </Animated.View>

      {/* Steps Breakdown */}
      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <Text style={styles.sectionTitle}>GUIDE STEPS</Text>

        <View style={styles.card}>
          <ProgressBar
            progress={stepsPercent}
            color={Colors.gold}
            label={`Steps Completed — ${stepsCompleted}/${allSteps.length}`}
          />

          <View style={styles.partsBreakdown}>
            {steps.map((part) => {
              const partCompleted = part.steps.filter((s) => completedSteps.includes(s.id)).length;
              const partPercent = part.steps.length > 0 ? (partCompleted / part.steps.length) * 100 : 0;
              return (
                <View key={part.id} style={styles.partRow}>
                  <Text style={styles.partName}>{part.title}</Text>
                  <View style={styles.partProgress}>
                    <Text style={styles.partCount}>
                      {partCompleted}/{part.steps.length}
                    </Text>
                    {partPercent === 100 && (
                      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Animated.View>

      {/* Quick Stats */}
      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <Text style={styles.sectionTitle}>QUICK FACTS</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{hajjTypeData.numberOfIhrams}</Text>
            <Text style={styles.statName}>Ihrams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{hajjTypeData.hadyRequired ? 'Yes' : 'No'}</Text>
            <Text style={styles.statName}>Hady Required</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{allSteps.length}</Text>
            <Text style={styles.statName}>Total Steps</Text>
          </View>
        </View>
      </Animated.View>

      {/* Data Transfer */}
      <Animated.View entering={FadeInDown.duration(400).delay(350)}>
        <Text style={styles.sectionTitle}>DATA TRANSFER</Text>
        <View style={styles.transferRow}>
          <TouchableOpacity style={styles.transferButton} onPress={handleExport} activeOpacity={0.7}>
            <Ionicons name="cloud-upload-outline" size={20} color={Colors.gold} />
            <Text style={styles.transferButtonText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.transferButton} onPress={handleImport} activeOpacity={0.7}>
            <Ionicons name="cloud-download-outline" size={20} color={Colors.gold} />
            <Text style={styles.transferButtonText}>Import</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Change Type */}
      <TouchableOpacity
        style={styles.changeButton}
        onPress={() => router.replace('/')}
        activeOpacity={0.7}
      >
        <Ionicons name="swap-horizontal-outline" size={18} color={Colors.gold} />
        <Text style={styles.changeButtonText}>Change Hajj Type</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.lockButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="lock-closed-outline" size={18} color={Colors.textMuted} />
        <Text style={styles.lockButtonText}>Lock App</Text>
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
  },
  overallCard: {
    backgroundColor: Colors.charcoal,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  ringContainer: {
    marginBottom: Spacing.md,
  },
  ringOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  ringInner: {
    alignItems: 'center',
  },
  ringPercent: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.gold,
  },
  ringLabel: {
    fontSize: 12,
    color: Colors.goldLight,
    fontWeight: '600',
  },
  overallTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
  },
  overallSubtitle: {
    fontSize: 13,
    color: Colors.goldLight,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  partsBreakdown: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  partRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  partProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  partCount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gold,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.gold,
  },
  statName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  transferRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  transferButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.gold,
    ...Shadows.card,
  },
  transferButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gold,
  },
  transferSection: {
    marginTop: Spacing.xl * 2,
    width: '100%',
    alignItems: 'center',
  },
  transferTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: BorderRadius.md,
  },
  importButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gold,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xl,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: BorderRadius.md,
  },
  changeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gold,
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
  },
  lockButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});
