import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadows } from '../../constants/theme';

interface GoldButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  style?: ViewStyle;
}

export default function GoldButton({ title, onPress, variant = 'filled', style }: GoldButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.outline,
        Shadows.card,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.gold,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  outlineText: {
    color: Colors.gold,
  },
});
