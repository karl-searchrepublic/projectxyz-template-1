import * as migration_20260722_014433_initial from './20260722_014433_initial';

export const migrations = [
  {
    up: migration_20260722_014433_initial.up,
    down: migration_20260722_014433_initial.down,
    name: '20260722_014433_initial'
  },
];
