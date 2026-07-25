import { TimezoneItem } from '../types';

export const TIMEZONES: TimezoneItem[] = [
  // UTC / GMT
  { value: 'UTC', label: '(UTC+00:00) Coordinated Universal Time', offset: '+00:00', region: 'Global', city: 'UTC' },
  
  // North America
  { value: 'America/New_York', label: '(UTC-05:00) Eastern Time (US & Canada)', offset: '-05:00', region: 'North America', city: 'New York' },
  { value: 'America/Chicago', label: '(UTC-06:00) Central Time (US & Canada)', offset: '-06:00', region: 'North America', city: 'Chicago' },
  { value: 'America/Denver', label: '(UTC-07:00) Mountain Time (US & Canada)', offset: '-07:00', region: 'North America', city: 'Denver' },
  { value: 'America/Los_Angeles', label: '(UTC-08:00) Pacific Time (US & Canada)', offset: '-08:00', region: 'North America', city: 'Los Angeles' },
  { value: 'America/Anchorage', label: '(UTC-09:00) Alaska', offset: '-09:00', region: 'North America', city: 'Anchorage' },
  { value: 'Pacific/Honolulu', label: '(UTC-10:00) Hawaii', offset: '-10:00', region: 'North America', city: 'Honolulu' },
  { value: 'America/Toronto', label: '(UTC-05:00) Toronto, Canada', offset: '-05:00', region: 'North America', city: 'Toronto' },
  { value: 'America/Vancouver', label: '(UTC-08:00) Vancouver, Canada', offset: '-08:00', region: 'North America', city: 'Vancouver' },
  { value: 'America/Mexico_City', label: '(UTC-06:00) Mexico City', offset: '-06:00', region: 'North America', city: 'Mexico City' },

  // South America
  { value: 'America/Sao_Paulo', label: '(UTC-03:00) Brasilia, Sao Paulo', offset: '-03:00', region: 'South America', city: 'Sao Paulo' },
  { value: 'America/Buenos_Aires', label: '(UTC-03:00) Buenos Aires', offset: '-03:00', region: 'South America', city: 'Buenos Aires' },
  { value: 'America/Bogota', label: '(UTC-05:00) Bogota, Lima, Quito', offset: '-05:00', region: 'South America', city: 'Bogota' },
  { value: 'America/Santiago', label: '(UTC-04:00) Santiago', offset: '-04:00', region: 'South America', city: 'Santiago' },

  // Europe
  { value: 'Europe/London', label: '(UTC+00:00) London, Edinburgh, Dublin', offset: '+00:00', region: 'Europe', city: 'London' },
  { value: 'Europe/Paris', label: '(UTC+01:00) Paris, Berlin, Madrid, Rome', offset: '+01:00', region: 'Europe', city: 'Paris' },
  { value: 'Europe/Amsterdam', label: '(UTC+01:00) Amsterdam, Brussels, Vienna', offset: '+01:00', region: 'Europe', city: 'Amsterdam' },
  { value: 'Europe/Athens', label: '(UTC+02:00) Athens, Bucharest, Istanbul', offset: '+02:00', region: 'Europe', city: 'Athens' },
  { value: 'Europe/Helsinki', label: '(UTC+02:00) Helsinki, Kyiv, Riga, Tallinn', offset: '+02:00', region: 'Europe', city: 'Helsinki' },
  { value: 'Europe/Moscow', label: '(UTC+03:00) Moscow, St. Petersburg', offset: '+03:00', region: 'Europe', city: 'Moscow' },

  // Asia & Middle East
  { value: 'Asia/Dubai', label: '(UTC+04:00) Dubai, Abu Dhabi, Muscat', offset: '+04:00', region: 'Asia & Middle East', city: 'Dubai' },
  { value: 'Asia/Kolkata', label: '(UTC+05:30) Mumbai, New Delhi, Kolkata', offset: '+05:30', region: 'Asia & Middle East', city: 'Kolkata' },
  { value: 'Asia/Dhaka', label: '(UTC+06:00) Dhaka', offset: '+06:00', region: 'Asia & Middle East', city: 'Dhaka' },
  { value: 'Asia/Bangkok', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta', offset: '+07:00', region: 'Asia & Middle East', city: 'Bangkok' },
  { value: 'Asia/Singapore', label: '(UTC+08:00) Singapore, Kuala Lumpur', offset: '+08:00', region: 'Asia & Middle East', city: 'Singapore' },
  { value: 'Asia/Shanghai', label: '(UTC+08:00) Beijing, Shanghai, Hong Kong', offset: '+08:00', region: 'Asia & Middle East', city: 'Shanghai' },
  { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo, Osaka, Sapporo', offset: '+09:00', region: 'Asia & Middle East', city: 'Tokyo' },
  { value: 'Asia/Seoul', label: '(UTC+09:00) Seoul', offset: '+09:00', region: 'Asia & Middle East', city: 'Seoul' },
  { value: 'Asia/Riyadh', label: '(UTC+03:00) Riyadh, Kuwait', offset: '+03:00', region: 'Asia & Middle East', city: 'Riyadh' },

  // Australia & Pacific
  { value: 'Australia/Perth', label: '(UTC+08:00) Perth', offset: '+08:00', region: 'Australia & Pacific', city: 'Perth' },
  { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney, Melbourne, Brisbane', offset: '+10:00', region: 'Australia & Pacific', city: 'Sydney' },
  { value: 'Australia/Adelaide', label: '(UTC+09:30) Adelaide', offset: '+09:30', region: 'Australia & Pacific', city: 'Adelaide' },
  { value: 'Pacific/Auckland', label: '(UTC+12:00) Auckland, Wellington', offset: '+12:00', region: 'Australia & Pacific', city: 'Auckland' },
  { value: 'Pacific/Fiji', label: '(UTC+12:00) Fiji', offset: '+12:00', region: 'Australia & Pacific', city: 'Fiji' },

  // Africa
  { value: 'Africa/Cairo', label: '(UTC+02:00) Cairo', offset: '+02:00', region: 'Africa', city: 'Cairo' },
  { value: 'Africa/Johannesburg', label: '(UTC+02:00) Johannesburg, Pretoria', offset: '+02:00', region: 'Africa', city: 'Johannesburg' },
  { value: 'Africa/Lagos', label: '(UTC+01:00) Lagos, Abuja', offset: '+01:00', region: 'Africa', city: 'Lagos' },
  { value: 'Africa/Nairobi', label: '(UTC+03:00) Nairobi', offset: '+03:00', region: 'Africa', city: 'Nairobi' }
];

export function getSystemTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch (e) {
    console.error('Failed to get system timezone', e);
  }
  return 'America/New_York';
}

export function formatTimeInTimezone(timezone: string, format: '12h' | '24h' = '12h'): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === '12h'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  } catch (e) {
    return new Date().toLocaleTimeString();
  }
}

export function formatDateInTimezone(timezone: string, dateFormat: string = 'YYYY-MM-DD'): string {
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  } catch (e) {
    return new Date().toLocaleDateString();
  }
}
