import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('wrench', 'droplets', 'waves', 'flame', 'zap', 'thermometer', 'wind', 'hammer', 'home', 'shield', 'sparkles', 'paintRoller', 'leaf', 'bug', 'car', 'scissors', 'key', 'search', 'truck', 'settings', 'clock', 'checkCircle');
  ALTER TABLE "services" ALTER COLUMN "icon" SET DEFAULT 'wrench'::"public"."enum_services_icon";
  ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_services_icon" USING (
    CASE "icon"
      WHEN '🚰' THEN 'waves'
      WHEN '🔥' THEN 'flame'
      WHEN '💧' THEN 'droplets'
      WHEN 'wrench' THEN 'wrench'
      WHEN 'droplets' THEN 'droplets'
      WHEN 'waves' THEN 'waves'
      WHEN 'flame' THEN 'flame'
      WHEN 'zap' THEN 'zap'
      WHEN 'thermometer' THEN 'thermometer'
      WHEN 'wind' THEN 'wind'
      WHEN 'hammer' THEN 'hammer'
      WHEN 'home' THEN 'home'
      WHEN 'shield' THEN 'shield'
      WHEN 'sparkles' THEN 'sparkles'
      WHEN 'paintRoller' THEN 'paintRoller'
      WHEN 'leaf' THEN 'leaf'
      WHEN 'bug' THEN 'bug'
      WHEN 'car' THEN 'car'
      WHEN 'scissors' THEN 'scissors'
      WHEN 'key' THEN 'key'
      WHEN 'search' THEN 'search'
      WHEN 'truck' THEN 'truck'
      WHEN 'settings' THEN 'settings'
      WHEN 'clock' THEN 'clock'
      WHEN 'checkCircle' THEN 'checkCircle'
      ELSE 'wrench'
    END
  )::"public"."enum_services_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "services" ALTER COLUMN "icon" DROP DEFAULT;
  DROP TYPE "public"."enum_services_icon";`)
}
