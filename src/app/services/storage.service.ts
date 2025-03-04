import { Injectable } from '@angular/core';

type Key = 'USER_DATA';

function addKeyPrefix(key: string) {
  const prefix = 'MD_AIDER_APP';
  return `${prefix}_${key}`;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  clear() {
    localStorage.clear();
  }

  getItem<T>(key: Key): T | null {
    const newKey = addKeyPrefix(key);
    try {
      const stringifiedJson = localStorage.getItem(newKey);
      if (stringifiedJson) {
        return JSON.parse(stringifiedJson);
      }
      return null;
    } catch {
      localStorage.removeItem(newKey);
      return null;
    }
  }

  removeItem(key: Key) {
    const newKey = addKeyPrefix(key);
    localStorage.removeItem(newKey);
  }

  setItem<T>(key: Key, value: T) {
    const newKey = addKeyPrefix(key);
    const stringifiedJson = JSON.stringify(value);
    localStorage.setItem(newKey, stringifiedJson);
  }
}
