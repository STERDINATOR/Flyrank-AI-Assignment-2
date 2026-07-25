import { z } from 'zod';

export const themeEnum = z.enum(['light', 'dark', 'system'], {
  message: 'Theme must be Light, Dark, or System',
});

export type ThemeType = z.infer<typeof themeEnum>;

export const settingsSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display Name is required')
    .min(3, 'Display Name must be at least 3 characters')
    .max(50, 'Display Name must not exceed 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid RFC-compliant email address'),
  theme: themeEnum,
  timezone: z
    .string()
    .min(1, 'Timezone is required'),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
