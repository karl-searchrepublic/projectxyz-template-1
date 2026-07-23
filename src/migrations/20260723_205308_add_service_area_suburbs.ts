import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_area_suburbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  ALTER TABLE "service_area_suburbs" ADD CONSTRAINT "service_area_suburbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_area"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_area_suburbs_order_idx" ON "service_area_suburbs" USING btree ("_order");
  CREATE INDEX "service_area_suburbs_parent_id_idx" ON "service_area_suburbs" USING btree ("_parent_id");`)

  // Ensure a service_area row exists before referencing it below (it should
  // already, via the earlier heading-migration's data copy, but don't assume).
  await db.execute(sql`
    INSERT INTO "service_area" ("heading", "created_at", "updated_at")
    SELECT 'Where We Service', now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "service_area");
  `)

  // Carry over existing suburb rows from Company Info into their new location.
  await db.execute(sql`
    INSERT INTO "service_area_suburbs" ("_order", "_parent_id", "id", "name")
    SELECT cis."_order", (SELECT id FROM "service_area" LIMIT 1), cis."id", cis."name"
    FROM "company_info_service_area_suburbs" cis;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_area_suburbs" CASCADE;`)
}
