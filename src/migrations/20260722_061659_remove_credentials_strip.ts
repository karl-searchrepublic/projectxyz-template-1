import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page_credentials_strip" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page_credentials_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  ALTER TABLE "about_page_credentials_strip" ADD CONSTRAINT "about_page_credentials_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_credentials_strip_order_idx" ON "about_page_credentials_strip" USING btree ("_order");
  CREATE INDEX "about_page_credentials_strip_parent_id_idx" ON "about_page_credentials_strip" USING btree ("_parent_id");`)
}
