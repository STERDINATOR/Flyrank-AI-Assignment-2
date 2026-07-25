import React, { useState, useEffect, useMemo } from 'react';
import { UserSettings, TabId } from './types';
import { DEFAULT_USER_SETTINGS } from './data/defaults';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { ProfileSection } from './components/ProfileSection';
import { AppearanceSection } from './components/AppearanceSection';
import { TimezoneSection } from './components/TimezoneSection';
import { PreferencesSection } from './components/PreferencesSection';
import { SaveBanner } from './components/SaveBanner';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'user_app_settings_v1';

export default function App() {
  // Load initial settings from localStorage or fallback to defaults
  const [savedSettings, setSavedSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_USER_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load settings from storage', e);
    }
    return DEFAULT_USER_SETTINGS;
  });

  const [settings, setSettings] = useState<UserSettings>(savedSettings);
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if settings differ from last saved state
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(savedSettings);
  }, [settings, savedSettings]);

  // Handle Theme switching dynamically on html element
  useEffect(() => {
    const root = document.documentElement;
    const mode = settings.themeMode;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (mode === 'dark') {
      applyTheme(true);
    } else if (mode === 'light') {
      applyTheme(false);
    } else {
      // System mode
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemDark);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.themeMode]);

  // Auto-save logic if enabled
  useEffect(() => {
    if (settings.autoSave && hasUnsavedChanges) {
      const timer = setTimeout(() => {
        handleSave();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [settings, hasUnsavedChanges]);

  // Update field handler
  const handleFieldChange = (field: keyof UserSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Save changes to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSavedSettings(settings);
      setToastMessage('Settings saved successfully!');
    } catch (e) {
      console.error('Failed to save settings', e);
      setToastMessage('Error saving settings.');
    }
  };

  // Discard changes
  const handleDiscard = () => {
    setSettings(savedSettings);
    setToastMessage('Changes discarded.');
  };

  // Reset to factory defaults
  const handleResetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedSettings(DEFAULT_USER_SETTINGS);
    setSettings(DEFAULT_USER_SETTINGS);
    setToastMessage('Settings reset to default.');
  };

  return (
    <div className="min-h-screen bg-zinc-100/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Main Header */}
      <Header
        settings={settings}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        accentColor={settings.accentColor}
      />

      {/* Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <SidebarNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            accentColor={settings.accentColor}
            hasUnsavedChanges={hasUnsavedChanges}
          />

          {/* Active Settings Panel */}
          <section className="flex-1 min-w-0">
            {activeTab === 'profile' && (
              <ProfileSection
                settings={settings}
                onChange={handleFieldChange}
                accentColor={settings.accentColor}
              />
            )}

            {activeTab === 'appearance' && (
              <AppearanceSection
                settings={settings}
                onChange={handleFieldChange}
              />
            )}

            {activeTab === 'timezone' && (
              <TimezoneSection
                settings={settings}
                onChange={handleFieldChange}
                accentColor={settings.accentColor}
              />
            )}

            {activeTab === 'preferences' && (
              <PreferencesSection
                settings={settings}
                onChange={handleFieldChange}
                onResetToDefaults={handleResetToDefaults}
                accentColor={settings.accentColor}
              />
            )}
          </section>
        </div>
      </main>

      {/* Save Banner Sticky Bar */}
      <SaveBanner
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onDiscard={handleDiscard}
        accentColor={settings.accentColor}
      />
    </div>
  );
}
