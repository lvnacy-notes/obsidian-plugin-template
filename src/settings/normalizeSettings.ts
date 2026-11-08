import type { PluginSettings } from '../types';

export const DEFAULT_SETTINGS: PluginSettings = {
	enabled: true,
	greeting: 'Hello',
};

/**
 * Returns a complete PluginSettings object from persisted data of unknown
 * shape. Missing, malformed or unknown fields fall back to the defaults.
 */
export function normalizeSettings(raw: unknown): PluginSettings {
	if (typeof raw !== 'object' || raw === null) {
		return { ...DEFAULT_SETTINGS };
	}

	const data = raw as Record<string, unknown>;

	return {
		enabled: typeof data.enabled === 'boolean'
			? data.enabled
			: DEFAULT_SETTINGS.enabled,
		greeting: typeof data.greeting === 'string'
			? data.greeting
			: DEFAULT_SETTINGS.greeting,
	};
}
