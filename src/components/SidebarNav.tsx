import React from 'react';
import { User, Palette, Globe, Sliders, CheckCircle2 } from 'lucide-react';
import { TabId, AccentColor } from '../types';
import { ACCENT_OPTIONS } from '../data/defaults';

interface SidebarNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  accentColor: AccentColor;
  hasUnsavedChanges: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onTabChange,
  accentColor,
  hasUnsavedChanges
}) => {
  const currentAccent = ACCENT_OPTIONS.find(a => a.id === accentColor) || ACCENT_OPTIONS[0];

  const navItems = [
    {
      id: 'profile' as TabId,
      label: 'Profile & Account',
      description: 'Name, email, and avatar',
      icon: User
    },
    {
      id: 'appearance' as TabId,
      label: 'Appearance & Theme',
      description: 'Light/Dark mode & accent colors',
      icon: Palette
    },
    {
      id: 'timezone' as TabId,
      label: 'Timezone & Region',
      description: 'Timezone, time & date format',
      icon: Globe
    },
    {
      id: 'preferences' as TabId,
      label: 'Preferences',
      description: 'Notifications & security options',
      icon: Sliders
    }
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      {/* Mobile Tab Pills */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 mb-6 scrollbar-none border-b border-zinc-200 dark:border-zinc-800">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? `${currentAccent.colorClass} shadow-sm`
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label.split(' ')[0]}</span>
              {isActive && hasUnsavedChanges && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Vertical Menu */}
      <div className="hidden lg:block space-y-1.5">
        <div className="px-3 pb-3">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Navigation
          </p>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`desktop-tab-${item.id}`}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/80 dark:border-zinc-800'
                  : 'hover:bg-zinc-100/80 dark:hover:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  isActive
                    ? currentAccent.bgLight
                    : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold truncate ${
                      isActive
                        ? 'text-zinc-900 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}

        {/* Status Indicator Widget */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Account Status</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 font-medium">
            Active & Verified
          </p>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-full rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
};
