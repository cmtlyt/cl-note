import mitt from 'mitt';

// eslint-disable-next-line @typescript-eslint/ban-types
type Emitter = {};

export const emitter = mitt<Emitter>();
