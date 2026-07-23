import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "company_info_service_area_suburbs" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "company_info_service_area_suburbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  ALTER TABLE "company_info_service_area_suburbs" ADD CONSTRAINT "company_info_service_area_suburbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_info"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "company_info_service_area_suburbs_order_idx" ON "company_info_service_area_suburbs" USING btree ("_order");
  CREATE INDEX "company_info_service_area_suburbs_parent_id_idx" ON "company_info_service_area_suburbs" USING btree ("_parent_id");`)
}
