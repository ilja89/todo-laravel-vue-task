import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";
import * as path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            refresh: true,
        }),
        vue()
    ],
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './resources')
        }
    }
});
