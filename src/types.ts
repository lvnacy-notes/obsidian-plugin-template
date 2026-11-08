import type { Plugin } from 'obsidian';

/** The slice of the plugin that the runtime needs from Obsidian. */
export type RuntimeHost = Pick<Plugin, 'loadData' | 'saveData'>;

export interface PluginSettings {
	enabled: boolean;
	greeting: string;
}

/** A started plugin. */
export interface Runtime {
	/** The current settings. */
	settings: PluginSettings;
	/** Saves the settings and releases everything the runtime started. */
	stop(): Promise<void>;
}
