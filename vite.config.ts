import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
export default defineConfig({
    plugins: [ViteMinifyPlugin()],
    server: {
        host: '127.0.0.1',
    },
    build: {
        minify: 'terser',
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
