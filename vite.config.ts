import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({
        include: ['src/**/*.ts'],
        outDir: 'dist',
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
        },
        rollupOptions: {
            external: [
                'fs',
                'path',
                'url',
                'http',
                'https',
                'stream',
                'crypto',
                'util',
                'events',
                'buffer',
                'os',
                'child_process',
            ],
        },
        target: 'node22',
    }
});