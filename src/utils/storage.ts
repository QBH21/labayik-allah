import AsyncStorage from '@react-native-async-storage/async-storage';
import { HajjTypeId } from '../data/types';

const PREFIX = '@labayik-allah';

const KEYS = {
  ACCOUNTS: `${PREFIX}/accounts`,
  ACTIVE_USER: `${PREFIX}/active-user`,
} as const;

function userKey(username: string, key: string): string {
  return `${PREFIX}/user/${username.toLowerCase()}/${key}`;
}

export type ChecklistState = Record<string, { isChecked: boolean; notes: string }>;

// --- Active user helpers ---

let _activeUser: string | null = null;

export function setActiveUser(username: string) {
  _activeUser = username;
}

export function getActiveUser(): string | null {
  return _activeUser;
}

// --- Per-user data (scoped by active username) ---

export async function saveSelectedType(type: HajjTypeId): Promise<void> {
  if (!_activeUser) return;
  await AsyncStorage.setItem(userKey(_activeUser, 'selected-type'), type);
}

export async function loadSelectedType(): Promise<HajjTypeId | null> {
  if (!_activeUser) return null;
  const value = await AsyncStorage.getItem(userKey(_activeUser, 'selected-type'));
  return value as HajjTypeId | null;
}

export async function saveChecklistState(state: ChecklistState): Promise<void> {
  if (!_activeUser) return;
  await AsyncStorage.setItem(userKey(_activeUser, 'checklist'), JSON.stringify(state));
}

export async function loadChecklistState(): Promise<ChecklistState> {
  if (!_activeUser) return {};
  const value = await AsyncStorage.getItem(userKey(_activeUser, 'checklist'));
  return value ? JSON.parse(value) : {};
}

export async function saveCompletedSteps(steps: string[]): Promise<void> {
  if (!_activeUser) return;
  await AsyncStorage.setItem(userKey(_activeUser, 'completed-steps'), JSON.stringify(steps));
}

export async function loadCompletedSteps(): Promise<string[]> {
  if (!_activeUser) return [];
  const value = await AsyncStorage.getItem(userKey(_activeUser, 'completed-steps'));
  return value ? JSON.parse(value) : [];
}

export async function clearAllData(): Promise<void> {
  if (!_activeUser) return;
  await AsyncStorage.multiRemove([
    userKey(_activeUser, 'selected-type'),
    userKey(_activeUser, 'checklist'),
    userKey(_activeUser, 'completed-steps'),
  ]);
}

// --- Auth / multi-account storage ---

export interface AuthData {
  username: string;
  pin: string;
}

async function getAllAccounts(): Promise<AuthData[]> {
  const value = await AsyncStorage.getItem(KEYS.ACCOUNTS);
  return value ? JSON.parse(value) : [];
}

async function saveAllAccounts(accounts: AuthData[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(accounts));
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const accounts = await getAllAccounts();
  return accounts.some((a) => a.username.toLowerCase() === username.toLowerCase());
}

export async function registerAccount(data: AuthData): Promise<boolean> {
  const accounts = await getAllAccounts();
  const exists = accounts.some((a) => a.username.toLowerCase() === data.username.toLowerCase());
  if (exists) return false;
  accounts.push(data);
  await saveAllAccounts(accounts);
  await AsyncStorage.setItem(KEYS.ACTIVE_USER, data.username);
  setActiveUser(data.username);
  return true;
}

export async function loginAccount(username: string, pin: string): Promise<boolean> {
  const accounts = await getAllAccounts();
  const account = accounts.find(
    (a) => a.username.toLowerCase() === username.toLowerCase() && a.pin === pin
  );
  if (account) {
    await AsyncStorage.setItem(KEYS.ACTIVE_USER, account.username);
    setActiveUser(account.username);
    return true;
  }
  return false;
}

export async function loadLastActiveUser(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.ACTIVE_USER);
}

export async function loadAuthData(): Promise<AuthData | null> {
  const lastUser = await loadLastActiveUser();
  if (!lastUser) return null;
  const accounts = await getAllAccounts();
  return accounts.find((a) => a.username.toLowerCase() === lastUser.toLowerCase()) ?? null;
}

export async function hasAuthSetup(): Promise<boolean> {
  const accounts = await getAllAccounts();
  return accounts.length > 0;
}

// --- Data export / import for device transfer ---

export interface BackupData {
  version: 1;
  exportedAt: string;
  account: AuthData;
  data: {
    selectedType: string | null;
    checklist: ChecklistState;
    completedSteps: string[];
  };
}

export async function exportUserData(): Promise<BackupData | null> {
  if (!_activeUser) return null;
  const accounts = await getAllAccounts();
  const account = accounts.find((a) => a.username.toLowerCase() === _activeUser!.toLowerCase());
  if (!account) return null;

  const selectedType = await AsyncStorage.getItem(userKey(_activeUser, 'selected-type'));
  const checklistRaw = await AsyncStorage.getItem(userKey(_activeUser, 'checklist'));
  const stepsRaw = await AsyncStorage.getItem(userKey(_activeUser, 'completed-steps'));

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    account,
    data: {
      selectedType,
      checklist: checklistRaw ? JSON.parse(checklistRaw) : {},
      completedSteps: stepsRaw ? JSON.parse(stepsRaw) : [],
    },
  };
}

export async function importUserData(backup: BackupData): Promise<{ success: boolean; error?: string }> {
  if (!backup || backup.version !== 1 || !backup.account) {
    return { success: false, error: 'Invalid backup file.' };
  }

  const { account, data } = backup;

  // Register account if it doesn't exist, or update if it does
  const accounts = await getAllAccounts();
  const existingIndex = accounts.findIndex(
    (a) => a.username.toLowerCase() === account.username.toLowerCase()
  );
  if (existingIndex === -1) {
    accounts.push(account);
  } else {
    accounts[existingIndex] = account;
  }
  await saveAllAccounts(accounts);

  // Restore user data
  const uname = account.username;
  if (data.selectedType) {
    await AsyncStorage.setItem(userKey(uname, 'selected-type'), data.selectedType);
  }
  if (data.checklist) {
    await AsyncStorage.setItem(userKey(uname, 'checklist'), JSON.stringify(data.checklist));
  }
  if (data.completedSteps) {
    await AsyncStorage.setItem(userKey(uname, 'completed-steps'), JSON.stringify(data.completedSteps));
  }

  // Set as active user
  await AsyncStorage.setItem(KEYS.ACTIVE_USER, uname);
  setActiveUser(uname);

  return { success: true };
}
