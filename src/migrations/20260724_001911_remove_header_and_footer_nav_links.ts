import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_links" CASCADE;
  DROP TABLE "footer_nav_links" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "header_nav_links" ADD CONSTRAINT "header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_links" ADD CONSTRAINT "footer_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_links_order_idx" ON "header_nav_links" USING btree ("_order");
  CREATE INDEX "header_nav_links_parent_id_idx" ON "header_nav_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_links_order_idx" ON "footer_nav_links" USING btree ("_order");
  CREATE INDEX "footer_nav_links_parent_id_idx" ON "footer_nav_links" USING btree ("_parent_id");`)
}
