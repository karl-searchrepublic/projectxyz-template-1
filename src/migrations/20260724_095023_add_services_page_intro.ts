import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page" ADD COLUMN "intro_heading" varchar DEFAULT 'Our Services';
  ALTER TABLE "services_page" ADD COLUMN "intro_text" varchar DEFAULT 'See below for a full list of the services we provide.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page" DROP COLUMN "intro_heading";
  ALTER TABLE "services_page" DROP COLUMN "intro_text";`)
}
