import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../constants/theme';
import { Classification } from '../../data/types';

const classificationStyles: Record<Classification, { bg: string; text: string }> = {
  FARD: { bg: Colors.fardBg, text: Colors.fard },
  WAJIB: { bg: Colors.wajibBg, text: Colors.wajib },
  SUNNAH: { bg: Colors.sunnahBg, text: Colors.sunnah },
  HARAM: { bg: Colors.haramBg, text: Colors.haram },
  MAKRUH: { bg: Colors.makruhBg, text: Colors.makruh },
};

interface BadgeProps {
  classification: Classification;
  size?: 'sm' | 'md';
}

export default function Badge({ classification, size = 'sm' }: BadgeProps) {
  const style = classificationStyles[classification];
  return (
    <View style={[styles.badge, { backgroundColor: style.bg }, size === 'md' && styles.badgeMd]}>
      <Text style={[styles.text, { color: style.text }, size === 'md' && styles.textMd]}>
        {classification}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  badgeMd: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textMd: {
    fontSize: 12,
  },
});
