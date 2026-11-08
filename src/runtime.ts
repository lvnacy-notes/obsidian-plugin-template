import { normalizeSettings } from './settings/normalizeSettings';
import type { Runtime, RuntimeHost } from './types';

/**
 * Loads the persisted settings and returns the running plugin. Everything
 * the plugin starts is stopped by the returned runtime's `stop`.
 */
export async function startRuntime(host: RuntimeHost): Promise<Runtime> {
	const settings = normalizeSettings(await host.loadData());

	return {
		settings,
		stop: async (): Promise<void> => {
			await host.saveData(settings);
		},
	};
}
