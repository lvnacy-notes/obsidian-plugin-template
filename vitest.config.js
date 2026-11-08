import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		// The npm `obsidian` package is a types-only shim with no runtime
		// entry, so the bare specifier resolves to the mock package.
		alias: {
			obsidian: 'obsidian-test-mocks/obsidian',
		},
	},
	test: {
		environment: 'jsdom',
		// Each file gets a fresh `window`; jsdom setup is shared per worker.
		pool: 'vmThreads',
		setupFiles: ['obsidian-test-mocks/vitest-setup'],
		include: [
			'src/**/*.test.{ts,tsx}',
			'test/**/*.test.{ts,tsx}',
		],
		coverage: {
			provider: 'v8',
			reporter: [
				'text',
				'json-summary',
			],
			// Generated each run and gitignored. The committed baseline
			// lives beside it in .coverage/baseline.json.
			reportsDirectory: '.coverage/report',
			include: ['src/**/*.{ts,tsx}'],
			// The Ratchet in .coverage/check-coverage-ratchet.js enforces
			// the floor; these stay at zero.
			thresholds: {
				lines: 0,
				functions: 0,
				branches: 0,
				statements: 0,
			},
		},
	},
});
