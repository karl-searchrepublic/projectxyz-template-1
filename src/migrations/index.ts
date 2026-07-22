import * as migration_20260722_014433_initial from './20260722_014433_initial';
import * as migration_20260722_022317_add_site_content from './20260722_022317_add_site_content';
import * as migration_20260722_024920_add_home_page from './20260722_024920_add_home_page';
import * as migration_20260722_031515_add_content_headings from './20260722_031515_add_content_headings';

export const migrations = [
  {
    up: migration_20260722_014433_initial.up,
    down: migration_20260722_014433_initial.down,
    name: '20260722_014433_initial',
  },
  {
    up: migration_20260722_022317_add_site_content.up,
    down: migration_20260722_022317_add_site_content.down,
    name: '20260722_022317_add_site_content',
  },
  {
    up: migration_20260722_024920_add_home_page.up,
    down: migration_20260722_024920_add_home_page.down,
    name: '20260722_024920_add_home_page',
  },
  {
    up: migration_20260722_031515_add_content_headings.up,
    down: migration_20260722_031515_add_content_headings.down,
    name: '20260722_031515_add_content_headings'
  },
];
