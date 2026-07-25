import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { settingsSchema, SettingsFormData } from '../../lib/validations/settingsSchema';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ThemeRadioGroup } from './ThemeRadioGroup';
import { TIMEZONES, getSystemTimezone } from '../../data/timezones';

interface SettingsFormProps {
  initialValues?: Partial<SettingsFormData>;
  onSubmit: (data: SettingsFormData) => Promise<void>;
  isSaving?: boolean;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialValues,
  onSubmit,
  isSaving = false,
}) => {
  const defaultBrowserTz = getSystemTimezone();

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: initialValues?.displayName || '',
      email: initialValues?.email || '',
      theme: initialValues?.theme || 'system',
      timezone: initialValues?.timezone || defaultBrowserTz,
    },
    shouldFocusError: true,
  });

  const isLoading = isSaving || isSubmitting;

  const handleFormSubmit = async (data: SettingsFormData) => {
    try {
      await onSubmit(data);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  // Custom handler on invalid to ensure focus on the first invalid field
  const onError = (formErrors: typeof errors) => {
    const errorKeys = Object.keys(formErrors) as (keyof SettingsFormData)[];
    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      if (firstErrorField === 'theme') {
        const themeElement = document.getElementById('theme-light');
        themeElement?.focus();
      } else {
        setFocus(firstErrorField);
      }
    }
  };

  const timezoneOptions = React.useMemo(() => {
    const hasDefault = TIMEZONES.some((tz) => tz.value === defaultBrowserTz);
    let list = TIMEZONES.map((tz) => ({
      value: tz.value,
      label: tz.label,
    }));

    if (!hasDefault && defaultBrowserTz) {
      list = [{ value: defaultBrowserTz, label: `(Detected) ${defaultBrowserTz}` }, ...list];
    }
    return list;
  }, [defaultBrowserTz]);

  return (
    <form
      id="settings-form"
      onSubmit={handleSubmit(handleFormSubmit, onError)}
      noValidate
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6"
    >
      <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Account Preferences
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Update your public profile, notification email, theme appearance, and timezone.
        </p>
      </div>

      {/* Display Name Field */}
      <FormInput
        id="displayName"
        label="Display Name"
        type="text"
        placeholder="e.g. Alex Rivera"
        required
        error={errors.displayName?.message}
        helperText="Must be between 3 and 50 characters."
        {...register('displayName')}
      />

      {/* Email Field */}
      <FormInput
        id="email"
        label="Email Address"
        type="email"
        placeholder="e.g. alex@example.com"
        required
        error={errors.email?.message}
        helperText="We will send important account updates to this email."
        {...register('email')}
      />

      {/* Theme Radio Group */}
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <ThemeRadioGroup
            id="theme"
            value={field.value}
            onChange={field.onChange}
            error={errors.theme?.message}
            name={field.name}
            ref={field.ref}
          />
        )}
      />

      {/* Timezone Select */}
      <FormSelect
        id="timezone"
        label="Primary Timezone"
        required
        options={timezoneOptions}
        error={errors.timezone?.message}
        helperText="Automatically set to your browser timezone by default."
        {...register('timezone')}
      />

      {/* Submit Controls */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end gap-3">
        <button
          type="submit"
          id="btn-save-settings"
          disabled={isLoading}
          aria-busy={isLoading}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-400 dark:disabled:bg-indigo-900/50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
