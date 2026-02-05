/**
 * Global LLM settings management using localStorage.
 * These settings are shared across all feature modules.
 */

const STORAGE_KEY = 'pm-aio-llm-settings';

export interface LLMSettings {
    baseURL: string;
    apiKey: string;
    model: string;
}

export const defaultSettings: LLMSettings = {
    baseURL: '',
    apiKey: '',
    model: 'gpt-4o',
};

/**
 * Load LLM settings from localStorage.
 * Returns default settings if none are saved.
 */
export function loadSettings(): LLMSettings {
    if (typeof window === 'undefined') {
        return defaultSettings;
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return { ...defaultSettings, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.error('Failed to load LLM settings:', e);
    }

    return defaultSettings;
}

/**
 * Save LLM settings to localStorage.
 */
export function saveSettings(settings: LLMSettings): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save LLM settings:', e);
    }
}

/**
 * Check if LLM settings are configured (has baseURL and apiKey).
 */
export function isSettingsConfigured(settings: LLMSettings): boolean {
    return Boolean(settings.baseURL && settings.apiKey);
}
