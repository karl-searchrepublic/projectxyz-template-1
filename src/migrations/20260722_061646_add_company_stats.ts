import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "company_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "company_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "company_stats_stats" ADD CONSTRAINT "company_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "company_stats_stats_order_idx" ON "company_stats_stats" USING btree ("_order");
  CREATE INDEX "company_stats_stats_parent_id_idx" ON "company_stats_stats" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "company_stats_stats" CASCADE;
  DROP TABLE "company_stats" CASCADE;`)
}
