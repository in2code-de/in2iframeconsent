import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

export default {
	input: "./JavaScripts/main.js",
	output: {
		file: "../Public/JavaScripts/main.js",
		format: "iife"
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: "node_modules/**",
		}),
		uglify()
	]
}
