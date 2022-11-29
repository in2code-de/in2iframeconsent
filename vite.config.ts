import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'in2iframeconsent',
            fileName: 'in2iframeconsent'
        },
    },
    plugins: [
        eslint()
    ],
})
