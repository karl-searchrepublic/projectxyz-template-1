import * as migration_20260722_014433_initial from './20260722_014433_initial';
import * as migration_20260722_022317_add_site_content from './20260722_022317_add_site_content';
import * as migration_20260722_024920_add_home_page from './20260722_024920_add_home_page';
import * as migration_20260722_031515_add_content_headings from './20260722_031515_add_content_headings';
import * as migration_20260722_033359_add_home_page_sections from './20260722_033359_add_home_page_sections';
import * as migration_20260722_035555_add_header_logo from './20260722_035555_add_header_logo';
import * as migration_20260722_044143_add_hero_image from './20260722_044143_add_hero_image';
import * as migration_20260722_044213_remove_hero_eyebrow from './20260722_044213_remove_hero_eyebrow';
import * as migration_20260722_055841_add_theme from './20260722_055841_add_theme';
import * as migration_20260722_061646_add_company_stats from './20260722_061646_add_company_stats';
import * as migration_20260722_061659_remove_credentials_strip from './20260722_061659_remove_credentials_strip';
import * as migration_20260722_214154_add_company_info from './20260722_214154_add_company_info';
import * as migration_20260722_220207_remove_hero_secondary_cta from './20260722_220207_remove_hero_secondary_cta';

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
    name: '20260722_031515_add_content_headings',
  },
  {
    up: migration_20260722_033359_add_home_page_sections.up,
    down: migration_20260722_033359_add_home_page_sections.down,
    name: '20260722_033359_add_home_page_sections',
  },
  {
    up: migration_20260722_035555_add_header_logo.up,
    down: migration_20260722_035555_add_header_logo.down,
    name: '20260722_035555_add_header_logo',
  },
  {
    up: migration_20260722_044143_add_hero_image.up,
    down: migration_20260722_044143_add_hero_image.down,
    name: '20260722_044143_add_hero_image',
  },
  {
    up: migration_20260722_044213_remove_hero_eyebrow.up,
    down: migration_20260722_044213_remove_hero_eyebrow.down,
    name: '20260722_044213_remove_hero_eyebrow',
  },
  {
    up: migration_20260722_055841_add_theme.up,
    down: migration_20260722_055841_add_theme.down,
    name: '20260722_055841_add_theme',
  },
  {
    up: migration_20260722_061646_add_company_stats.up,
    down: migration_20260722_061646_add_company_stats.down,
    name: '20260722_061646_add_company_stats',
  },
  {
    up: migration_20260722_061659_remove_credentials_strip.up,
    down: migration_20260722_061659_remove_credentials_strip.down,
    name: '20260722_061659_remove_credentials_strip',
  },
  {
    up: migration_20260722_214154_add_company_info.up,
    down: migration_20260722_214154_add_company_info.down,
    name: '20260722_214154_add_company_info',
  },
  {
    up: migration_20260722_220207_remove_hero_secondary_cta.up,
    down: migration_20260722_220207_remove_hero_secondary_cta.down,
    name: '20260722_220207_remove_hero_secondary_cta'
  },
];
