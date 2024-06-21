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
      [
        'hidden-with-position',
        {
          position: 'fixed',
          top: '-1px',
          left: '-1px',
          width: '0px',
          height: '0px',
          overflow: 'hidden',
          'z-index': -1,
          opacity: 0,
          'pointer-events': 'none',
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
