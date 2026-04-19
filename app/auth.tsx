import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../src/constants/theme';
import { useAuth } from '../src/context/AuthContext';

export default function AuthScreen() {
  const { hasAccount, username, login, register, checkUsername } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(hasAccount ? 'login' : 'register');
  const [pin, setPin] = useState(['', '', '', '']);
  const [nameInput, setNameInput] = useState('');
  const [step, setStep] = useState<'name' | 'pin' | 'confirm'>(hasAccount ? 'pin' : 'name');
  const [firstPin, setFirstPin] = useState('');
  const [error, setError] = useState('');
  const pinRefs = useRef<(TextInput | null)[]>([]);

  const resetPin = () => {
    setPin(['', '', '', '']);
    setError('');
    setTimeout(() => pinRefs.current[0]?.focus(), 100);
  };

  const handlePinChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    if (value && index === 3) {
      const fullPin = newPin.join('');
      if (fullPin.length === 4) {
        handlePinComplete(fullPin);
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handlePinComplete = async (fullPin: string) => {
    if (mode === 'login') {
      const success = await login(fullPin);
      if (!success) {
        setError('Incorrect PIN. Please try again.');
        resetPin();
      }
    } else {
      if (step === 'pin') {
        setFirstPin(fullPin);
        setStep('confirm');
        resetPin();
      } else if (step === 'confirm') {
        if (fullPin === firstPin) {
          const result = await register(nameInput.trim(), fullPin);
          if (!result.success) {
            setError(result.error ?? 'Registration failed.');
            setFirstPin('');
            setStep('name');
            resetPin();
          }
        } else {
          setError('PINs do not match. Try again.');
          setFirstPin('');
          setStep('pin');
          resetPin();
        }
      }
    }
  };

  const handleNameSubmit = async () => {
    const trimmed = nameInput.trim();
    if (trimmed.length < 1) {
      setError('Please enter a username');
      return;
    }
    const taken = await checkUsername(trimmed);
    if (taken) {
      setError('This username is already taken. Please choose another.');
      return;
    }
    setError('');
    setStep('pin');
    setTimeout(() => pinRefs.current[0]?.focus(), 300);
  };

  const getTitle = () => {
    if (mode === 'login') return `Welcome back, ${username}`;
    if (step === 'name') return 'Create Your Account';
    if (step === 'pin') return 'Choose a 4-Digit PIN';
    return 'Confirm Your PIN';
  };

  const getSubtitle = () => {
    if (mode === 'login') return 'Enter your PIN to continue';
    if (step === 'name') return 'Choose a unique username';
    if (step === 'pin') return "You'll use this PIN to access your tracker";
    return 'Enter your PIN again to confirm';
  };

  return (
    <LinearGradient colors={[Colors.charcoal, '#0D0D1A']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Icon */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons
              name={mode === 'login' ? 'lock-closed' : 'person-add'}
              size={40}
              color={Colors.gold}
            />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </Animated.View>

        {/* Name Input (register mode only) */}
        {mode === 'register' && step === 'name' && (
          <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.nameSection}>
            <TextInput
              style={styles.nameInput}
              placeholder="Choose a username"
              placeholderTextColor={Colors.textMuted}
              value={nameInput}
              onChangeText={(t) => {
                setNameInput(t);
                setError('');
              }}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={handleNameSubmit}
              maxLength={20}
            />
            <TouchableOpacity
              style={[styles.nextButton, !nameInput.trim() && styles.nextButtonDisabled]}
              onPress={handleNameSubmit}
              disabled={!nameInput.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.white} />
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* PIN Input */}
        {(mode === 'login' || step === 'pin' || step === 'confirm') && step !== 'name' && (
          <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.pinSection}>
            <View style={styles.pinRow}>
              {[0, 1, 2, 3].map((i) => (
                <TextInput
                  key={i}
                  ref={(r) => {
                    pinRefs.current[i] = r;
                  }}
                  style={[styles.pinBox, pin[i] ? styles.pinBoxFilled : null]}
                  value={pin[i]}
                  onChangeText={(v) => handlePinChange(v, i)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  secureTextEntry
                  autoFocus={i === 0}
                  selectTextOnFocus
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Error */}
        {error ? (
          <Animated.View entering={FadeInUp.duration(300)}>
            <Text style={styles.error}>{error}</Text>
          </Animated.View>
        ) : null}

        {/* Switch mode */}
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => {
            if (mode === 'login') {
              setMode('register');
              setStep('name');
              setNameInput('');
              setError('');
              resetPin();
            } else {
              if (hasAccount) {
                setMode('login');
                setStep('pin');
                resetPin();
              }
            }
          }}
        >
          <Text style={styles.switchText}>
            {mode === 'login'
              ? 'Create new account'
              : hasAccount
                ? 'Already have an account? Log in'
                : ''}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.goldLight,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  nameSection: {
    width: '100%',
    alignItems: 'center',
  },
  nameInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.gold,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  pinSection: {
    alignItems: 'center',
  },
  pinRow: {
    flexDirection: 'row',
    gap: 16,
  },
  pinBox: {
    width: 56,
    height: 64,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gold,
  },
  pinBoxFilled: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },
  error: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  switchButton: {
    marginTop: Spacing.xl * 2,
  },
  switchText: {
    color: Colors.goldLight,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
