import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Shadows } from '../src/constants/theme';
import { hajjTypes } from '../src/data/hajjTypes';
import { useHajjType } from '../src/context/HajjTypeContext';
import { useAuth } from '../src/context/AuthContext';
import { HajjTypeId } from '../src/data/types';

const { width } = Dimensions.get('window');

const typeColors: Record<HajjTypeId, string> = {
  tamattu: '#6B3FA0',
  qiran: '#1A6B5A',
  ifrad: '#B8860B',
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { setSelectedType } = useHajjType();
  const { username, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleSelectType = async (typeId: HajjTypeId) => {
    await setSelectedType(typeId);
    router.replace('/(tabs)/guide');
  };

  return (
    <LinearGradient
      colors={[Colors.charcoal, '#0F0F1E', Colors.charcoalLight]}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
          <View style={styles.kaabahIcon}>
            <Ionicons name="cube" size={48} color={Colors.gold} />
          </View>
          <Text style={styles.title}>Labayik Allah</Text>
          <Text style={styles.subtitle}>
            {username ? `Assalamu Alaikum, ${username}` : 'Your Complete Hajj Guide'}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.bismillah}>
            بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
          </Text>
        </Animated.View>

        {/* Hajj Type Selection */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text style={styles.sectionTitle}>Choose Your Hajj Type</Text>
        </Animated.View>

        {hajjTypes.map((type, index) => (
          <Animated.View
            key={type.id}
            entering={FadeInDown.duration(500).delay(300 + index * 100)}
          >
            <TouchableOpacity
              style={styles.typeCard}
              onPress={() => handleSelectType(type.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.typeCardAccent, { backgroundColor: typeColors[type.id] }]} />
              <View style={styles.typeCardContent}>
                <View style={styles.typeCardHeader}>
                  <Text style={styles.typeName}>{type.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color={Colors.gold} />
                </View>
                <Text style={styles.typeSubtitle}>{type.subtitle}</Text>
                <Text style={styles.typeDescription}>{type.bestFor}</Text>
                <View style={styles.typeMetaRow}>
                  <View style={styles.metaChip}>
                    <Text style={styles.metaText}>
                      {type.numberOfIhrams} Ihram{type.numberOfIhrams > 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View style={[styles.metaChip, type.hadyRequired && styles.metaChipActive]}>
                    <Text style={[styles.metaText, type.hadyRequired && styles.metaTextActive]}>
                      Hady: {type.hadyRequired ? 'Required' : 'Optional'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Footer */}
        <Animated.View entering={FadeInDown.duration(500).delay(700)} style={styles.footer}>
          <Text style={styles.footerText}>
            May Allah accept your Hajj and make it Mabrur. Ameen.
          </Text>
          <Text style={styles.footerNote}>
            Where scholars differ, the easiest valid opinion has been selected.
          </Text>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInDown.duration(500).delay(800)}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={18} color={Colors.goldLight} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  kaabahIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.goldLight,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: Colors.gold,
    marginVertical: Spacing.lg,
    borderRadius: 1,
  },
  bismillah: {
    fontSize: 22,
    color: Colors.goldLight,
    textAlign: 'center',
    lineHeight: 36,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.goldLight,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  typeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Shadows.elevated,
  },
  typeCardAccent: {
    width: 5,
  },
  typeCardContent: {
    flex: 1,
    padding: Spacing.md,
  },
  typeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  typeSubtitle: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: '600',
    marginTop: 2,
  },
  typeDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  typeMetaRow: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  metaChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.goldMuted,
  },
  metaChipActive: {
    backgroundColor: Colors.wajibBg,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.goldDark,
  },
  metaTextActive: {
    color: Colors.wajib,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  footerText: {
    fontSize: 15,
    color: Colors.goldLight,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  footerNote: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: BorderRadius.md,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.goldLight,
  },
});
