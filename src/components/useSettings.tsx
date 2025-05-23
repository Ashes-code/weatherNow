import { create } from 'zustand';

type SettingsStore = {
  unit: 'C' | 'F';
  city: string;
  setUnit: (unit: 'C' | 'F') => void;
  setCity: (city: string) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  unit: localStorage.getItem('unit') as 'C' | 'F' || 'C',
  city: localStorage.getItem('city') || 'New York',
  setUnit: (unit) => {
    localStorage.setItem('unit', unit);
    set({ unit });
  },
  setCity: (city) => {
    localStorage.setItem('city', city);
    set({ city });
  },
}));
