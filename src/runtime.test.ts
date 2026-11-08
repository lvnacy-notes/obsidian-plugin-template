import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS } from './settings/normalizeSettings';
import { startRuntime } from './runtime';
import type { RuntimeHost } from './types';

function buildHost(persisted: unknown): RuntimeHost {
	return {
		loadData: vi.fn().mockResolvedValue(persisted),
		saveData: vi.fn().mockResolvedValue(undefined),
	};
}

describe('startRuntime', () => {
	it('normalizes whatever the host has persisted', async () => {
		const host = buildHost({ greeting: 42 });

		const runtime = await startRuntime(host);

		expect(runtime.settings).toEqual(DEFAULT_SETTINGS);
	});

	it('saves the settings when stopped', async () => {
		const host = buildHost({ enabled: false });
		const runtime = await startRuntime(host);

		await runtime.stop();

		expect(host.saveData).toHaveBeenCalledWith({
			...DEFAULT_SETTINGS,
			enabled: false,
		});
	});
});
