import React, { useEffect, useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck } from 'lucide-react';
import { fetchUserSettings, updateUserSettings } from '../lib/api';
import { SettingsFormData } from '../lib/validations/settingsSchema';
import { SettingsForm } from '../components/forms/SettingsForm';
import { useToast } from '../hooks/useToast';
import { ToastNotification } from '../components/forms/ToastNotification';

export const Settings: React.FC = () => {
  const [initialSettings, setInitialSettings] = useState<SettingsFormData | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchUserSettings();
        if (isMounted) {
          setInitialSettings(data);
          // Apply theme to document element
          applyThemeMode(data.theme);
        }
      } catch (err) {
        if (isMounted) {
          showToast('Failed to load initial settings.', 'error');
        }
      } finally {
        if (isMounted) {
          setIsLoadingInitial(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [showToast]);

  const applyThemeMode = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  };

  const handleSaveSettings = async (data: SettingsFormData) => {
    setIsSaving(true);
    try {
      const res = await updateUserSettings(data);
      if (res.success) {
        setInitialSettings(res.data);
        applyThemeMode(res.data.theme);
        showToast('Settings saved successfully!');
      }
    } catch (error) {
      showToast('Error saving settings. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 py-10 px-4 sm:px-6 lg:px-8">
      <ToastNotification toast={toast} onClose={hideToast} />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <SettingsIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Account Settings
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Manage your account preferences and display settings.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </header>

        {/* Main Form Content */}
        <main>
          {isLoadingInitial ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 border border-zinc-200/80 dark:border-zinc-800 text-center space-y-3">
              <div className="inline-block p-4 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 animate-spin">
                <SettingsIcon className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Loading settings...
              </p>
            </div>
          ) : (
            <SettingsForm
              initialValues={initialSettings || undefined}
              onSubmit={handleSaveSettings}
              isSaving={isSaving}
            />
          )}
        </main>
      </div>
    </div>
  );
};
