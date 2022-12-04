/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: './utils',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        // 支持内联 javascript
        javascriptEnabled: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './utils/test-setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
