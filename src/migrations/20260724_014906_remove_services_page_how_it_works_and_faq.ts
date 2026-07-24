import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_page_how_it_works" CASCADE;
  DROP TABLE "services_page_faq" CASCADE;
  ALTER TABLE "services_page" DROP COLUMN "how_it_works_heading";
  ALTER TABLE "services_page" DROP COLUMN "faq_heading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_page_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "services_page_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  ALTER TABLE "services_page" ADD COLUMN "how_it_works_heading" varchar DEFAULT 'How It Works';
  ALTER TABLE "services_page" ADD COLUMN "faq_heading" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "services_page_how_it_works" ADD CONSTRAINT "services_page_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_faq" ADD CONSTRAINT "services_page_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_page_how_it_works_order_idx" ON "services_page_how_it_works" USING btree ("_order");
  CREATE INDEX "services_page_how_it_works_parent_id_idx" ON "services_page_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "services_page_faq_order_idx" ON "services_page_faq" USING btree ("_order");
  CREATE INDEX "services_page_faq_parent_id_idx" ON "services_page_faq" USING btree ("_parent_id");`)
}
