import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import svelteConfig from './svelte.config.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		files: ['**/*.svelte', '**/*.ts', '**/*.js'],
		plugins: {
			'@stylistic': stylistic
		},
		rules: {
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
			'no-unused-vars': 'warn',
			'no-use-before-define': 'error',
			'no-useless-backreference': 'warn',
			'require-atomic-updates': 'warn',
			'use-isnan': 'error',
			'valid-typeof': ['error', {
				requireStringLiterals: false
			}],
			'accessor-pairs': 'error',
			'@stylistic/semi': ['error', 'never', {
				beforeStatementContinuationChars: 'never'
			}],
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/arrow-spacing': 'error',
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/block-spacing': 'error',
			'@stylistic/brace-style': ['error', '1tbs', {
				allowSingleLine: true
			}],
			'@stylistic/quotes': ['error', 'single', {
				avoidEscape: false
			}],
			'@stylistic/comma-spacing': 'error',
			'@stylistic/computed-property-spacing': 'error',
			'@stylistic/function-call-spacing': 'error',
			'@stylistic/generator-star-spacing': ['error', {
				before: false,
				after: true
			}],
			'@stylistic/key-spacing': 'error',
			'@stylistic/keyword-spacing': 'error',
			'@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'@stylistic/no-multi-spaces': 'error',
			'@stylistic/no-trailing-spaces': ['error', {
				skipBlankLines: true
			}],
			'@stylistic/no-whitespace-before-property': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/rest-spread-spacing': 'error',
			'@stylistic/space-before-blocks': 'error',
			'@stylistic/space-before-function-paren': ['error', {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}],
			'@stylistic/space-in-parens': 'error',
			'@stylistic/space-infix-ops': ['error', {
				int32Hint: false
			}],
			'@stylistic/space-unary-ops': 'error',
			'@stylistic/spaced-comment': 'warn',
			'@stylistic/switch-colon-spacing': 'error',
			'@stylistic/template-curly-spacing': 'error',
			'@stylistic/template-tag-spacing': 'error',
			'@stylistic/type-annotation-spacing': 'error',
			'@stylistic/type-generic-spacing': 'error',
			'@stylistic/type-named-tuple-spacing': 'error',
			'@stylistic/yield-star-spacing': 'error',
			'@stylistic/array-bracket-newline': ['error', 'consistent'],
			'@stylistic/array-element-newline': ['error', 'consistent'],
			'@stylistic/eol-last': 'error',
			'@stylistic/function-call-argument-newline': ['error', 'consistent'],
			'@stylistic/function-paren-newline': ['error', 'multiline'],
			'@stylistic/lines-between-class-members': ['error', {
				enforce: [
					{ blankLine: 'always', prev: '*', next: '*' },
					{ blankLine: 'never', prev: 'field', next: 'field' }
				]
			}],
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/object-curly-newline': ['error', {
				consistent: true
			}],
			'@stylistic/object-property-newline': ['error', {
				allowAllPropertiesOnSameLine: true
			}],
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/arrow-parens': 'error',
			'@stylistic/new-parens': 'error',
			'@stylistic/wrap-iife': ['error', 'inside'],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/quote-props': ['error', 'consistent-as-needed'],
			'@stylistic/comma-dangle': ['error', 'never'],
			'@stylistic/comma-style': 'error',
			'@stylistic/no-floating-decimal': 'error',
			'@stylistic/no-multiple-empty-lines': ['warn', {
				max: 2,
				maxBOF: 0,
				maxEOF: 0
			}],
			'@stylistic/no-tabs': ['error', {
				allowIndentationTabs: true
			}],
			'@stylistic/max-len': ['warn', {
				code: 120,
				ignoreUrls: true,
				ignoreRegExpLiterals: true
			}],
			'@stylistic/max-statements-per-line': 'error',
			'@stylistic/padded-blocks': ['error', 'never'],
			'@stylistic/member-delimiter-style': ['error', {
				multiline: {
					delimiter: 'comma',
					requireLast: false
				},
				singleline: {
					delimiter: 'comma',
					requireLast: false
				}
			}]
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
]
