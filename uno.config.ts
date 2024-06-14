import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{tsx}'],
  },
  presets: [presetUno(), presetAttributify()],
});
