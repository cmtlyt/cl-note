import { defineConfig, Preset, presetAttributify, presetUno } from 'unocss';

const custonPresets: Preset[] = [
  {
    name: 'custom-style',
    rules: [
      [
        'top-shadow',
        {
          'box-shadow': '0 -0.3rem 1rem -0.9rem var(--shadow-color);',
        },
      ],
    ],
  },
];

export default defineConfig({
  content: {
    filesystem: ['src/**/*.{tsx}'],
  },
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
    }),
    ...custonPresets,
  ],
});
