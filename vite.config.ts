import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {resolve} from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2022',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    }
  },
  plugins: [
    tsconfigPaths()
  ],
  resolve: {
    alias: [{find: '@src', replacement: resolve(__dirname, 'src')}]
  }
});
