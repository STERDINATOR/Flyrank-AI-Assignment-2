import { SettingsFormData } from './validations/settingsSchema';

const STORAGE_KEY = 'user_settings_data_v1';

export function getDefaultBrowserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz || 'UTC';
  } catch {
    return 'UTC';
  }
}

export const INITIAL_USER_SETTINGS: SettingsFormData = {
  displayName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  theme: 'system',
  timezone: getDefaultBrowserTimezone(),
};

export async function fetchUserSettings(): Promise<SettingsFormData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...INITIAL_USER_SETTINGS,
        ...parsed,
        timezone: parsed.timezone || getDefaultBrowserTimezone(),
      };
    }
  } catch (err) {
    console.error('Failed to load settings from storage', err);
  }

  return INITIAL_USER_SETTINGS;
}

export async function updateUserSettings(data: SettingsFormData): Promise<{ success: boolean; data: SettingsFormData }> {
  // Simulate network delay for saving
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save settings', err);
    throw new Error('Could not save user settings to storage');
  }
}
