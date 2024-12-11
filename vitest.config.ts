/// <reference types="vitest/config" />
import { defineConfig } from 'vite';


export default defineConfig({
    // @ts-ignore
    test: {
        globals: true,
        environment: "happy-dom", // 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string.
        setupFiles: ["./setup.js"],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
})