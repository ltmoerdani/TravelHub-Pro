import { defineConfig } from 'vite';
import solid from 'solid-start/vite';
import nodeAdapter from 'solid-start-node';

export default defineConfig({
  plugins: [
    solid({
      adapter: nodeAdapter(),
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
}); 