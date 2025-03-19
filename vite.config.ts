import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).global = window;
}

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'react-router-dom'],
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
    'global.Buffer': 'Buffer',
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      buffer: 'buffer',
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /.*\.(ts|tsx)$/,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          if (id.includes('react-router-dom')) {
            return 'router';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});