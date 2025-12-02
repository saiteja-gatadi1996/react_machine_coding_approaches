// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 👇 for project pages: https://<user>.github.io/<repo>/
  base: '/react_machine_coding_approaches/',
});
