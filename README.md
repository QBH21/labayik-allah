# Labayik Allah

A complete Hajj tracker app built with Expo and React Native. Covers all three types of Hajj: **Tamattu'**, **Qiran**, and **Ifrad** with step-by-step guidance, interactive checklists, and progress tracking.

## Features

- **Step-by-Step Guide** - Detailed walkthrough for each Hajj type with classification badges (Fard, Wajib, Sunnah)
- **Interactive Checklist** - Track your Fard and Wajib acts with checkboxes and personal notes
- **Ihram Rules & Prohibited Acts** - Universal rules and type-specific prohibitions
- **Reference Hub** - Key dates timeline, practical tips, type comparison table, common mistakes
- **Progress Dashboard** - Visual progress tracking with completion percentages
- **PIN Authentication** - Secure your data with a 4-digit PIN and unique username
- **Multi-Account Support** - Multiple users on the same device with isolated data
- **Data Transfer** - Export/import your data as a JSON backup file to transfer between devices

## Content Source

All Islamic content is sourced exclusively from the Hajj Tracker Guide PDF covering the Hanafi, Shafi'i, Hanbali, and Maliki positions. Where scholars differ, the easiest valid opinion has been selected.

## Tech Stack

- **Expo** (managed workflow) with TypeScript
- **expo-router** for file-based navigation
- **AsyncStorage** for local data persistence
- **react-native-reanimated** for smooth animations
- **expo-linear-gradient** for gradient backgrounds

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on Android
npx expo start --android
```

## Project Structure

```
app/                    # Screens (file-based routing)
  auth.tsx              # PIN login / registration
  index.tsx             # Welcome screen (Hajj type selection)
  (tabs)/               # Tab navigator
    guide/              # Step-by-step guide screens
    checklist.tsx       # Interactive checklist
    rules.tsx           # Ihram rules & prohibitions
    reference/          # Reference hub (dates, tips, comparison, mistakes)
    progress.tsx        # Progress dashboard + data transfer

src/
  components/ui/        # Reusable UI components (Badge, ProgressBar, etc.)
  constants/theme.ts    # Design tokens (colors, spacing, shadows)
  context/              # React context providers (Auth, HajjType, Checklist)
  data/                 # All content data from PDF
  utils/storage.ts      # AsyncStorage persistence layer
```

## Data Storage

All data is stored locally on the device using AsyncStorage:
- User accounts (username + PIN)
- Selected Hajj type
- Checklist progress and notes
- Completed guide steps

Each user's data is scoped to their username, ensuring multi-account isolation.

## Data Transfer Between Devices

1. Go to the **Progress** tab
2. Tap **Export** to save a backup file
3. Share the file via WhatsApp, email, or any file transfer method
4. On the new device, go to **Progress** tab and tap **Import**
5. Select the backup file - your account and all data will be restored
