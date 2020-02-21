import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babel-minify";

export default {
	input: "JavaScripts/in2iframeconsent.js",
	output: {
		file: "../Public/JavaScripts/in2iframeconsent.min.js",
		format: "iife"
	},
	plugins: [

		resolve(),
		commonjs(),
		babel({
			exclude: "node_modules/**",
		}),
		minify({
			comments: false,
		})
	]
}
