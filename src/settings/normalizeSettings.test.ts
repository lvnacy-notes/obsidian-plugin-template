import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, normalizeSettings } from './normalizeSettings';

describe('normalizeSettings', () => {
	it('returns the defaults when nothing has been persisted', () => {
		const result = normalizeSettings(null);

		expect(result).toEqual(DEFAULT_SETTINGS);
	});

	it('returns the defaults when the persisted data is not an object', () => {
		const result = normalizeSettings('corrupt');

		expect(result).toEqual(DEFAULT_SETTINGS);
	});

	it('fills in fields missing from older persisted data', () => {
		const result = normalizeSettings({ enabled: false });

		expect(result).toEqual({
			...DEFAULT_SETTINGS,
			enabled: false,
		});
	});

	it('replaces fields of the wrong type with their defaults', () => {
		const result = normalizeSettings({ enabled: 'yes', greeting: 42 });

		expect(result).toEqual(DEFAULT_SETTINGS);
	});

	it('drops fields it does not recognize', () => {
		const result = normalizeSettings({ legacyField: true });

		expect(result).not.toHaveProperty('legacyField');
	});
});
