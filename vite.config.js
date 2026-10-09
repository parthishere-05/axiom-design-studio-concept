import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    // The hero renders are already compressed at asset-prep time; keeping the
    // inline limit low avoids base64-bloating the JS bundle.
    assetsInlineLimit: 2048,
  },
});
