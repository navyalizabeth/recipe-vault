import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.VITE_API_URL;

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
