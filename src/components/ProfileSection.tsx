import React, { useState } from 'react';
import { User, Mail, Camera, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserSettings, AccentColor } from '../types';
import { AVATAR_PRESETS, ACCENT_OPTIONS } from '../data/defaults';

interface ProfileSectionProps {
  settings: UserSettings;
  onChange: (field: keyof UserSettings, value: any) => void;
  accentColor: AccentColor;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  settings,
  onChange,
  accentColor
}) => {
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [showCustomAvatarModal, setShowCustomAvatarModal] = useState(false);
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCustomAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarInput.trim()) {
      onChange('avatarUrl', customAvatarInput.trim());
      setCustomAvatarInput('');
      setShowCustomAvatarModal(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-zinc-500" />
          Profile Settings
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your personal information, public profile, and contact address.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-4">
          Profile Photo
        </label>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group">
            <img
              src={settings.avatarUrl}
              alt={settings.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-zinc-100 dark:ring-zinc-800 shadow-md"
              onError={(e) => {
                // Fallback on broken image link
                (e.target as HTMLImageElement).src = AVATAR_PRESETS[0].url;
              }}
            />
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  id={`preset-avatar-${preset.id}`}
                  onClick={() => onChange('avatarUrl', preset.url)}
                  className={`relative w-10 h-10 rounded-xl overflow-hidden ring-2 transition-all ${
                    settings.avatarUrl === preset.url
                      ? `${currentAccent.borderClass} ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 scale-105`
                      : 'ring-transparent hover:ring-zinc-300 dark:hover:ring-zinc-700 opacity-70 hover:opacity-100'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {settings.avatarUrl === preset.url && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                id="btn-custom-avatar-url"
                onClick={() => setShowCustomAvatarModal(!showCustomAvatarModal)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4"
              >
                {showCustomAvatarModal ? 'Cancel custom URL' : 'Use image URL'}
              </button>
            </div>

            {showCustomAvatarModal && (
              <form onSubmit={handleCustomAvatarSubmit} className="flex gap-2 pt-1 animate-fadeIn">
                <input
                  type="url"
                  id="input-avatar-url"
                  placeholder="https://example.com/avatar.jpg"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  id="btn-apply-avatar-url"
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl text-white ${currentAccent.colorClass}`}
                >
                  Apply
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info Form */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="user-name-input" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="user-name-input"
              value={settings.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all"
            />
          </div>
          {settings.name.trim() === '' && (
            <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Name cannot be empty.
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="user-email-input" className="block text-sm font-semibold text-zinc-900 dark:text-white">
              Email Address <span className="text-rose-500">*</span>
            </label>
            {isValidEmail(settings.email) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              id="user-email-input"
              value={settings.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="alex@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all ${
                isValidEmail(settings.email)
                  ? 'border-zinc-200 dark:border-zinc-700'
                  : 'border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            />
          </div>

          {!isValidEmail(settings.email) && (
            <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid email address.
            </p>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
            Your email is used for account recovery and notifications.
          </p>
        </div>

        {/* Bio Field */}
        <div>
          <label htmlFor="user-bio-input" className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
            Bio & Summary
          </label>
          <textarea
            id="user-bio-input"
            rows={3}
            value={settings.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Tell us a little about yourself..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all resize-none"
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 text-right">
            {settings.bio.length} / 250 characters
          </p>
        </div>
      </div>
    </div>
  );
};
