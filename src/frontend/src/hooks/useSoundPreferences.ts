import { useEffect, useState } from "react";

export interface SoundPreferences {
  enabled: boolean;
  volume: number;
}

const STORAGE_KEY = "tcea-sound-preferences";

const DEFAULT_PREFERENCES: SoundPreferences = {
  enabled: true,
  volume: 0.6,
};

export function useSoundPreferences() {
  const [preferences, setPreferences] = useState<SoundPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          enabled: parsed.enabled ?? DEFAULT_PREFERENCES.enabled,
          volume: parsed.volume ?? DEFAULT_PREFERENCES.volume,
        };
      }
    } catch (error) {
      console.error("Failed to load sound preferences:", error);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save sound preferences:", error);
    }
  }, [preferences]);

  const setEnabled = (enabled: boolean) => {
    setPreferences((prev) => ({ ...prev, enabled }));
  };

  const setVolume = (volume: number) => {
    setPreferences((prev) => ({ ...prev, volume }));
  };

  return {
    preferences,
    setEnabled,
    setVolume,
  };
}
