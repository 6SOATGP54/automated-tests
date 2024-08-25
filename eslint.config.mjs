import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [...compat.extends(
	'eslint:recommended',
	'plugin:cypress/recommended',
	'plugin:chai-friendly/recommended',
), {
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.commonjs,
		},

		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	rules: {
		'cypress/no-assigning-return-values': 'error',
		'cypress/no-unnecessary-waiting': 'error',
		'cypress/no-force': 'warn',
		'cypress/no-async-tests': 'error',
		'cypress/no-pause': 'error',
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'import/no-commonjs': 'off',

		'no-restricted-syntax': [
			'error', {
				selector: 'ExportDefaultDeclaration',
				message: 'Only `module.exports` is allowed.',
			}, {
				selector: 'ExportNamedDeclaration[declaration.type!="VariableDeclaration"]',
				message: 'Only `module.exports` is allowed.',
			}
		],

		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
}]