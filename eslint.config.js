import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import svelteConfig from './svelte.config.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		files: ['**/*.svelte', '**/*.ts', '**/*.js'],
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'svelte/valid-compile': 'off',
			'constructor-super': 'error',
			'for-direction': 'warn',
			'getter-return': 'error',
			'no-async-promise-executor': 'error',
			'no-await-in-loop': 'warn',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'warn',
			'no-cond-assign': 'warn',
			'no-const-assign': 'error',
			'no-constant-condition': 'warn',
			'no-constructor-return': 'error',
			'no-debugger': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'error',
			'no-empty-character-class': 'warn',
			'no-empty-pattern': 'error',
			'no-ex-assign': 'error',
			'no-fallthrough': 'warn',
			'no-func-assign': 'error',
			'no-import-assign': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-loss-of-precision': 'warn',
			'no-misleading-character-class': 'warn',
			'no-new-native-nonconstructor': 'error',
			'no-obj-calls': 'error',
			'no-promise-executor-return': 'warn',
			'no-prototype-builtins': 'warn',
			'no-self-assign': 'error',
			'no-self-compare': 'error',
			'no-setter-return': 'error',
			'no-sparse-arrays': 'warn',
			'no-template-curly-in-string': 'warn',
			'no-this-before-super': 'error',
			'no-unexpected-multiline': 'warn',
			'no-unreachable': 'warn',
			'no-unreachable-loop': 'warn',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'warn',
			'no-unsafe-optional-chaining': 'warn',
			'no-unused-private-class-members': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'after-used',
					ignoreRestSiblings: true,
				},
			],
			'no-useless-backreference': 'warn',
			'use-isnan': 'error',
			'valid-typeof': [
				'error',
				{
					requireStringLiterals: false,
				},
			],
			'accessor-pairs': 'error',
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/'],
	},
];
