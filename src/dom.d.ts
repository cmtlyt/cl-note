import type { AttributifyNames } from '@unocss/preset-attributify';

interface HTMLAttributes extends Partial<Record<AttributifyNames, string>> {}
