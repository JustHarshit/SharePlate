import { Preferences } from '@capacitor/preferences';
import { isNative } from './platform';

export const setItem = async (key, value) => {
  if (isNative()) {
    await Preferences.set({ key, value });
  } else {
    localStorage.setItem(key, value);
  }
};

export const getItem = async (key) => {
  if (isNative()) {
    const { value } = await Preferences.get({ key });
    return value;
  } else {
    return localStorage.getItem(key);
  }
};

export const removeItem = async (key) => {
  if (isNative()) {
    await Preferences.remove({ key });
  } else {
    localStorage.removeItem(key);
  }
};

export const clear = async () => {
  if (isNative()) {
    await Preferences.clear();
  } else {
    localStorage.clear();
  }
};