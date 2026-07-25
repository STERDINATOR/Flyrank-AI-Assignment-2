export type ThemeMode = 'light' | 'dark' | 'system';

export type AccentColor = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan';

export type TimeFormat = '12h' | '24h';

export type StartOfWeek = 'monday' | 'sunday' | 'saturday';

export interface UserSettings {
  // User Profile
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  
  // Theme & Appearance
  themeMode: ThemeMode;
  accentColor: AccentColor;
  uiDensity: 'compact' | 'comfortable' | 'spacious';
  
  // Timezone & Localization
  timezone: string;
  timeFormat: TimeFormat;
  startOfWeek: StartOfWeek;
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  
  // Preferences & Notifications
  emailNotifications: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  autoSave: boolean;
}

export type TabId = 'profile' | 'appearance' | 'timezone' | 'preferences';

export interface TimezoneItem {
  value: string;
  label: string;
  offset: string;
  region: string;
  city: string;
}
