import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import { list as babelHelpersList } from '@babel/helpers';
import pkg from './package.json'

const mergeAll = objs => Object.assign({}, ...objs)

const commonPlugins = [
	nodeResolve({ jsnext: true, extensions: ['.jsx', '.js'] }),
	babel({
		exclude: 'node_modules/**',
		externalHelpersWhitelist: babelHelpersList.filter(helperName => helperName !== 'wrapNativeSuper')
	}),
	commonjs(),
]

const configBase = {
	input: 'src/index.js',
	external: Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {})),
	plugins: commonPlugins,
}

const umdConfig = mergeAll([
	configBase,
	{
		output: {
			file: `dist/${ pkg.name }.js`,
			format: 'umd',
			name: 'ReactLinkify',
			globals: { react: 'React', 'react-dom': 'ReactDOM', 'prop-types': 'PropTypes' },
		},
		external: Object.keys(pkg.peerDependencies || {}),
	},
])

const devUmdConfig = mergeAll([
	umdConfig,
	{
		plugins: umdConfig.plugins.concat(
			replace({
				'process.env.NODE_ENV': JSON.stringify('development'),
			})
		),
	},
])

const prodUmdConfig = mergeAll([
	umdConfig,
	{ output: mergeAll([umdConfig.output, { file: umdConfig.output.file.replace(/\.js$/, '.min.js') }]) },
	{
		plugins: umdConfig.plugins.concat(
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			uglify({
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					warnings: false,
				},
			})
		),
	},
])

const webConfig = mergeAll([
	configBase,
	{ output: [{ file: pkg.module, format: 'es' }, { file: pkg.main, format: 'cjs' }] },
])

export default [devUmdConfig, prodUmdConfig, webConfig]
