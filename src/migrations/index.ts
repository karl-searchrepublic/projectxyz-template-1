import * as migration_20260722_014433_initial from './20260722_014433_initial';
import * as migration_20260722_022317_add_site_content from './20260722_022317_add_site_content';

export const migrations = [
  {
    up: migration_20260722_014433_initial.up,
    down: migration_20260722_014433_initial.down,
    name: '20260722_014433_initial',
  },
  {
    up: migration_20260722_022317_add_site_content.up,
    down: migration_20260722_022317_add_site_content.down,
    name: '20260722_022317_add_site_content'
  },
];
