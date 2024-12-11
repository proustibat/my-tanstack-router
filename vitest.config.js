"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="vitest/config" />
var vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    // @ts-ignore
    test: {
        globals: true,
        environment: "happy-dom", // 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string.
        setupFiles: ["./setup.js"]
    },
});
