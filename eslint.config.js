import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import obs from 'eslint-plugin-obsidianmd';

export default defineConfig([
	...obs.configs.recommended,
	{
		ignores: [
			'.coverage/report/**',
			'.obsidian/**',
			'dist/**',
			'node_modules/**',
			'*.map',
			'main.js',
		],
	},
	{
		// Shared parser and rules for every hand-written file, JS and TS.
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.js',
		],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				global: 'readonly',
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'error',
			reportUnusedInlineConfigs: 'error',
		},
		plugins: {
			'@stylistic': stylistic,
			'@typescript-eslint': tseslint,
		},
		rules: {
			'curly': 'warn',
			'default-case-last': 'error',
			'max-classes-per-file': [
				'error',
				{
					'ignoreExpressions': true,
				},
			],
			'new-cap': 'error',
			'no-console': [
				'warn',
				{
					allow: [
						'group',
						'groupCollapsed',
						'groupEnd',
						'warn',
						'error',
					],
				},
			],
			'no-eval': 'error',
			'no-extra-boolean-cast': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'off',
			'no-multi-assign': 'error',
			'no-param-reassign': 'error',
			'no-prototype-builtins': 'off',
			'no-shadow': 'off',
			'no-undef': 'off',
			'no-unexpected-multiline': 'off',
			'no-unused-vars': 'off',
			'no-use-before-define': 'off',
			'no-useless-assignment': 'warn',
			'no-useless-rename': 'warn',
			'no-var': 'error',
			'prefer-const': 'warn',
			'prefer-destructuring': [
				'error',
				{
					'array': false,
					'object': true,
				},
			],
			'prefer-template': 'warn',
			'require-atomic-updates': 'error',
			'require-await': 'warn',
			'yoda': 'error',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					'argsIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/no-use-before-define': [
				'error',
				{
					'functions': false,
					'classes': false,
					'variables': true,
				},
			],

			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/no-mixed-spaces-and-tabs': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/quotes': [
				'error',
				'single',
				{
					'allowTemplateLiterals': 'always',
					'avoidEscape': true,
				},
			],
			'@stylistic/semi': ['error', 'always'],

			// Proper nouns that keep their capitalization in UI text.
			'obsidianmd/ui/sentence-case': [
				'warn',
				{
					brands: [
						'My Plugin',
					],
				},
			],

			// No rule may be disabled by comment, anywhere.
			'eslint-comments/no-restricted-disable': ['error', '*'],
		},
	},
	{
		// Type-aware rules need parserOptions.project, so this block covers
		// exactly the extensions tsconfig.json includes.
		files: [
			'**/*.ts',
			'**/*.tsx',
		],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		rules: {
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		},
	},
	{
		// Node-only tooling: build, version and CI scripts never run inside
		// Obsidian's plugin process.
		files: [
			'esbuild.config.js',
			'version-bump.js',
			'vitest.config.js',
			'eslint.config.js',
			'.coverage/check-coverage-ratchet.js',
		],
		rules: {
			'obsidianmd/no-nodejs-modules': 'off',
			'obsidianmd/rule-custom-message': 'off',
			'obsidianmd/hardcoded-config-path': 'off',
			'no-console': 'off',
		},
	},
]);
