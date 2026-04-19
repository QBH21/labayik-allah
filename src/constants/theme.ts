export const Colors = {
  gold: '#D4AF37',
  goldLight: '#E8D48B',
  goldDark: '#B8960C',
  goldMuted: '#F5ECD7',
  white: '#FFFFFF',

  charcoal: '#1A1A2E',
  charcoalLight: '#2D2D44',
  slate: '#4A4A68',
  ivory: '#FDF8EE',
  cream: '#FAF3E0',

  fard: '#8B1A1A',
  fardBg: '#FDE8E8',
  wajib: '#B8860B',
  wajibBg: '#FFF3CD',
  sunnah: '#2E7D32',
  sunnahBg: '#E8F5E9',
  haram: '#C62828',
  haramBg: '#FFEBEE',
  makruh: '#616161',
  makruhBg: '#F5F5F5',

  text: '#1A1A2E',
  textSecondary: '#4A4A68',
  textMuted: '#9E9E9E',
  border: '#E0D5C1',
  borderLight: '#F0EBE0',
  success: '#2E7D32',
  error: '#C62828',
  cardBg: '#FFFFFF',
  screenBg: '#FDF8EE',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;
