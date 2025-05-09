// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

type Key = 'USER_DATA';

function addKeyPrefix(key: string) {
  const prefix = 'MD_AIDER_APP';
  return `${prefix}_${key}`;
}

@Injectable({ providedIn: 'root' })
export class CapacitorStorageService {
  async setItem<T>(key: Key, value: T): Promise<void> {
    const newKey = addKeyPrefix(key);
    await Preferences.set({
      key: newKey,
      value: JSON.stringify(value),
    });
  }

  async getItem<T>(key: Key): Promise<T | null> {
    const newKey = addKeyPrefix(key);
    const { value } = await Preferences.get({ key: newKey });
    try {
      return value && value !== 'undefined' ? JSON.parse(value) : null;
    } catch (err) {
      console.error('Failed to parse value for key:', key, value, err);
      return null;
    }
  }

  async removeItem(key: Key): Promise<void> {
    const newKey = addKeyPrefix(key);
    await Preferences.remove({ key: newKey });
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }
}
