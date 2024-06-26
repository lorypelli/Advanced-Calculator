import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
export default defineConfig({
    plugins: [ViteMinifyPlugin()],
    server: {
        open: true,
        host: '127.0.0.1',
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                ecma: 2020,
                passes: 10,
            },
        },
        rollupOptions: {
            output: {
                dir: './dist',
                entryFileNames: 'index.js',
                assetFileNames: 'style.css',
                compact: true,
            },
        },
    },
});
