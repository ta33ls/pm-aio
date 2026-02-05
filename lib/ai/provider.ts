import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import type { LLMSettings } from '@/lib/ai/settings';

/**
 * Creates an OpenAI-compatible provider with custom base URL and API key.
 * Used for connecting to custom LLM endpoints (e.g., proxy APIs).
 */
export function createLLMProvider(settings: LLMSettings) {
    if (!settings.baseURL || !settings.apiKey) {
        throw new Error('LLM settings not configured. Please configure in Settings page.');
    }

    return createOpenAICompatible({
        name: 'custom-llm',
        baseURL: settings.baseURL,
        apiKey: settings.apiKey,
    });
}

/**
 * Get a language model with the configured settings.
 */
export function getLLMModel(settings: LLMSettings) {
    const provider = createLLMProvider(settings);
    return provider(settings.model);
}
