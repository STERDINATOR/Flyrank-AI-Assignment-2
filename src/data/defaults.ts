import { UserSettings, AccentColor } from '../types';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  bio: 'Senior Product Designer & Frontend Developer. Building intuitive user interfaces.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  
  themeMode: 'system',
  accentColor: 'indigo',
  uiDensity: 'comfortable',
  
  timezone: 'America/New_York',
  timeFormat: '12h',
  startOfWeek: 'monday',
  dateFormat: 'YYYY-MM-DD',
  
  emailNotifications: true,
  securityAlerts: true,
  marketingEmails: false,
  autoSave: true,
};

export const AVATAR_PRESETS = [
  { id: 'avatar-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', label: 'Default Photo' },
  { id: 'avatar-2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', label: 'Male Portrait' },
  { id: 'avatar-3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300', label: 'Female Portrait' },
  { id: 'avatar-4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', label: 'Casual Smile' },
  { id: 'avatar-5', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', label: 'Professional' },
  { id: 'avatar-6', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300', label: 'Abstract 3D' }
];

export interface AccentOption {
  id: AccentColor;
  name: string;
  colorClass: string;
  bgLight: string;
  borderClass: string;
  hex: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'indigo', name: 'Indigo', colorClass: 'bg-indigo-600 hover:bg-indigo-700 text-white', bgLight: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400', borderClass: 'border-indigo-600 dark:border-indigo-500', hex: '#4f46e5' },
  { id: 'emerald', name: 'Emerald', colorClass: 'bg-emerald-600 hover:bg-emerald-700 text-white', bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400', borderClass: 'border-emerald-600 dark:border-emerald-500', hex: '#059669' },
  { id: 'violet', name: 'Violet', colorClass: 'bg-violet-600 hover:bg-violet-700 text-white', bgLight: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400', borderClass: 'border-violet-600 dark:border-violet-500', hex: '#7c3aed' },
  { id: 'amber', name: 'Amber', colorClass: 'bg-amber-500 hover:bg-amber-600 text-white', bgLight: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400', borderClass: 'border-amber-500 dark:border-amber-400', hex: '#f59e0b' },
  { id: 'rose', name: 'Rose', colorClass: 'bg-rose-600 hover:bg-rose-700 text-white', bgLight: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400', borderClass: 'border-rose-600 dark:border-rose-500', hex: '#e11d48' },
  { id: 'cyan', name: 'Ocean Cyan', colorClass: 'bg-cyan-600 hover:bg-cyan-700 text-white', bgLight: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400', borderClass: 'border-cyan-600 dark:border-cyan-500', hex: '#0891b2' },
];
