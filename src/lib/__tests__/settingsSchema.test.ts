import { describe, it, expect } from 'vitest';
import { settingsSchema } from '../validations/settingsSchema';

describe('settingsSchema Validation', () => {
  it('passes with valid data', () => {
    const validData = {
      displayName: 'Jane Doe',
      email: 'jane.doe@example.com',
      theme: 'dark' as const,
      timezone: 'America/New_York',
    };

    const result = settingsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('displayName validation', () => {
    it('fails when displayName is empty', () => {
      const data = {
        displayName: '',
        email: 'test@example.com',
        theme: 'light' as const,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain('Display Name is required');
      }
    });

    it('fails when displayName is shorter than 3 characters', () => {
      const data = {
        displayName: 'Al',
        email: 'test@example.com',
        theme: 'light' as const,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain('Display Name must be at least 3 characters');
      }
    });

    it('fails when displayName exceeds 50 characters', () => {
      const data = {
        displayName: 'a'.repeat(51),
        email: 'test@example.com',
        theme: 'light' as const,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayName).toContain('Display Name must not exceed 50 characters');
      }
    });
  });

  describe('email validation', () => {
    it('fails when email is empty', () => {
      const data = {
        displayName: 'Alex',
        email: '',
        theme: 'light' as const,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain('Email is required');
      }
    });

    it('fails when email is invalid format', () => {
      const data = {
        displayName: 'Alex',
        email: 'not-an-email',
        theme: 'light' as const,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain('Please enter a valid RFC-compliant email address');
      }
    });
  });

  describe('theme validation', () => {
    it('fails when theme is invalid', () => {
      const data = {
        displayName: 'Alex',
        email: 'alex@example.com',
        theme: 'blue' as any,
        timezone: 'UTC',
      };
      const result = settingsSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
