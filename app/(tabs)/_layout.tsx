import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color }: { name: IoniconsName; color: string }) {
  return <Ionicons name={name} size={22} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 28,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: Colors.charcoal,
        },
        headerTintColor: Colors.gold,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Guide',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon name="book-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Checklist',
          headerTitle: 'Checklist Tracker',
          tabBarIcon: ({ color }) => <TabIcon name="checkbox-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: 'Rules',
          headerTitle: 'Ihram Rules',
          tabBarIcon: ({ color }) => <TabIcon name="shield-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reference"
        options={{
          title: 'Reference',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon name="library-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          headerTitle: 'Your Progress',
          tabBarIcon: ({ color }) => <TabIcon name="stats-chart-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
