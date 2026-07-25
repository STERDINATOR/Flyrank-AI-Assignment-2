import React, { useState, useEffect } from 'react';
import { Globe, Clock, Search, Navigation, Calendar, Check, Compass } from 'lucide-react';
import { UserSettings, AccentColor, TimeFormat, StartOfWeek } from '../types';
import { TIMEZONES, getSystemTimezone, formatTimeInTimezone, formatDateInTimezone } from '../data/timezones';
import { ACCENT_OPTIONS } from '../data/defaults';

interface TimezoneSectionProps {
  settings: UserSettings;
  onChange: (field: keyof UserSettings, value: any) => void;
  accentColor: AccentColor;
}

export const TimezoneSection: React.FC<TimezoneSectionProps> = ({
  settings,
  onChange,
  accentColor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveTime, setLiveTime] = useState<string>('');
  const [liveDate, setLiveDate] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  // Update live clock every second
  useEffect(() => {
    const updateClock = () => {
      setLiveTime(formatTimeInTimezone(settings.timezone, settings.timeFormat));
      setLiveDate(formatDateInTimezone(settings.timezone, settings.dateFormat));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [settings.timezone, settings.timeFormat, settings.dateFormat]);

  const handleAutoDetect = () => {
    const detectedTz = getSystemTimezone();
    onChange('timezone', detectedTz);
  };

  const filteredTimezones = TIMEZONES.filter(tz => {
    const q = searchQuery.toLowerCase();
    return (
      tz.label.toLowerCase().includes(q) ||
      tz.value.toLowerCase().includes(q) ||
      tz.city.toLowerCase().includes(q) ||
      tz.region.toLowerCase().includes(q)
    );
  });

  const selectedTzObject = TIMEZONES.find(t => t.value === settings.timezone) || {
    value: settings.timezone,
    label: settings.timezone,
    city: settings.timezone.split('/')[1]?.replace('_', ' ') || settings.timezone,
    region: settings.timezone.split('/')[0] || 'Custom',
    offset: ''
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-zinc-500" />
          Timezone & Localization
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Configure your primary timezone, live clock format, and calendar preferences.
        </p>
      </div>

      {/* Live Clock Card */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
          <Clock className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Current Timezone Preview</span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {selectedTzObject.city}
              <span className="text-xs font-normal px-2 py-0.5 rounded-md bg-zinc-700/80 text-zinc-300">
                {selectedTzObject.value}
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {liveDate}
            </p>
          </div>

          <div className="bg-zinc-800/80 border border-zinc-700/80 rounded-xl px-5 py-3 backdrop-blur-xs flex flex-col items-end">
            <span className="text-3xl font-mono font-bold tracking-tight text-white">
              {liveTime || '12:00:00 PM'}
            </span>
            <span className="text-xs text-zinc-400 mt-0.5">
              Format: {settings.timeFormat.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Timezone Selection Box */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label htmlFor="timezone-search-input" className="block text-sm font-semibold text-zinc-900 dark:text-white">
            Primary Timezone <span className="text-rose-500">*</span>
          </label>

          <button
            type="button"
            id="btn-auto-detect-tz"
            onClick={handleAutoDetect}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-indigo-500" />
            Detect Automatically
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            id="timezone-search-input"
            value={searchQuery}
            onFocus={() => setIsSearching(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, region, or GMT offset (e.g. New York, London, Tokyo, +05:30)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              id="btn-clear-tz-search"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Timezone Select / List */}
        <div className="mt-3">
          <label htmlFor="timezone-native-select" className="sr-only">Select Timezone</label>
          <select
            id="timezone-native-select"
            value={settings.timezone}
            onChange={(e) => onChange('timezone', e.target.value)}
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {filteredTimezones.length === 0 ? (
              <option value={settings.timezone}>{settings.timezone}</option>
            ) : (
              filteredTimezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Popular Shortcuts */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-2">
            Quick Select:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'New York (EST)', value: 'America/New_York' },
              { label: 'London (GMT)', value: 'Europe/London' },
              { label: 'Paris (CET)', value: 'Europe/Paris' },
              { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
              { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
              { label: 'Kolkata (IST)', value: 'Asia/Kolkata' }
            ].map((quick) => (
              <button
                key={quick.value}
                type="button"
                id={`quick-tz-${quick.value.replace('/', '-')}`}
                onClick={() => onChange('timezone', quick.value)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                  settings.timezone === quick.value
                    ? `${currentAccent.colorClass} border-transparent font-medium`
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {quick.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date & Time Format Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Format */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <label className="block text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            Time Display Format
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[
              { id: '12h' as TimeFormat, label: '12-Hour', example: '02:30 PM' },
              { id: '24h' as TimeFormat, label: '24-Hour', example: '14:30' }
            ].map((tf) => {
              const isSelected = settings.timeFormat === tf.id;
              return (
                <button
                  key={tf.id}
                  type="button"
                  id={`time-format-${tf.id}`}
                  onClick={() => onChange('timeFormat', tf.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? `bg-zinc-50 dark:bg-zinc-800/80 ${currentAccent.borderClass}`
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {tf.label}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-500" />}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {tf.example}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start of Week */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <label className="block text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-500" />
            First Day of Week
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'monday' as StartOfWeek, label: 'Monday' },
              { id: 'sunday' as StartOfWeek, label: 'Sunday' },
              { id: 'saturday' as StartOfWeek, label: 'Saturday' }
            ].map((sow) => {
              const isSelected = settings.startOfWeek === sow.id;
              return (
                <button
                  key={sow.id}
                  type="button"
                  id={`start-of-week-${sow.id}`}
                  onClick={() => onChange('startOfWeek', sow.id)}
                  className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                    isSelected
                      ? `${currentAccent.colorClass} border-transparent`
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {sow.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
