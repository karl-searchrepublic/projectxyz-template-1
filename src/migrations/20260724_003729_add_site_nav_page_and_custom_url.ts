import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_nav_nav_links_page" AS ENUM('/', '/about', '/services', '/contact', 'custom');
  ALTER TABLE "site_nav_nav_links" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "site_nav_nav_links" ADD COLUMN "page" "enum_site_nav_nav_links_page" DEFAULT '/';
  ALTER TABLE "site_nav_nav_links" ADD COLUMN "custom_url" varchar;`)

  // Map each existing href onto the fixed set of built-in pages where it
  // matches one exactly; anything else (an external link, or a path outside
  // the 4 built-in pages) falls back to the Custom URL option so no link
  // silently breaks or gets dropped.
  await db.execute(sql`
    UPDATE "site_nav_nav_links"
    SET
      "page" = CASE
        WHEN "href" IN ('/', '/about', '/services', '/contact')
          THEN "href"::"public"."enum_site_nav_nav_links_page"
        ELSE 'custom'::"public"."enum_site_nav_nav_links_page"
      END,
      "custom_url" = CASE
        WHEN "href" IN ('/', '/about', '/services', '/contact') THEN NULL
        ELSE "href"
      END
    WHERE "href" IS NOT NULL;
  `)

  await db.execute(sql`
   ALTER TABLE "site_nav_nav_links" ALTER COLUMN "page" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_nav_nav_links" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "site_nav_nav_links" DROP COLUMN "page";
  ALTER TABLE "site_nav_nav_links" DROP COLUMN "custom_url";
  DROP TYPE "public"."enum_site_nav_nav_links_page";`)
}
