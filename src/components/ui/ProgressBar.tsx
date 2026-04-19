import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors, BorderRadius } from '../../constants/theme';

interface ProgressBarProps {
  progress: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({
  progress,
  color = Colors.gold,
  label,
  showPercentage = true,
  height = 8,
}: ProgressBarProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(Math.min(progress, 100), { duration: 800 });
  }, [progress, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={[styles.percentage, { color }]}>{Math.round(progress)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.fill, { backgroundColor: color, height }, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  percentage: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
});
