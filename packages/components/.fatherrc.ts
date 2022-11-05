import { defineConfig } from 'father';
export default defineConfig({
  esm: {
    extraBabelPresets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
    transformer: 'babel',
    output: 'es',
  },
  cjs: {
    output: 'lib',
  },
});
