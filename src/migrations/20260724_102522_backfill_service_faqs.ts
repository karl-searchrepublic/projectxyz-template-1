import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Only backfills a service that currently has zero FAQ entries, so this is
  // safe to run against production data without clobbering anything an
  // editor may have already added manually via the admin UI.
  await db.execute(sql`
    INSERT INTO "services_faq" ("_order", "_parent_id", "id", "question", "answer")
    SELECT
      v._order,
      s.id,
      substr(md5(random()::text || clock_timestamp()::text || v._order::text), 1, 24),
      v.question,
      v.answer
    FROM "services" s,
      (VALUES
        (0, 'How do you find the cause of a blocked drain?', 'We start with a CCTV drain camera to see exactly where the blockage is and what is causing it before we recommend a fix.'),
        (1, 'Will you need to dig up my yard?', 'Usually not. High-pressure water jetting clears most blockages without any digging, so excavation is only used as a last resort.'),
        (2, 'How much does it cost to clear a blocked drain?', 'Costs vary depending on the location and severity of the blockage, but we always provide an upfront quote before starting any work.'),
        (3, 'Can tree roots cause a blocked drain?', 'Yes, tree roots are one of the most common causes of blocked drains, especially in older clay pipes. Our CCTV camera can confirm if roots are the issue.'),
        (4, 'How can I stop my drains from blocking again?', 'Avoid pouring fats, oils, and wipes down the drain, and consider a scheduled drain clean if blockages keep recurring.')
      ) AS v(_order, question, answer)
    WHERE s.slug = 'blocked-drains'
      AND NOT EXISTS (SELECT 1 FROM "services_faq" WHERE "_parent_id" = s.id);

    INSERT INTO "services_faq" ("_order", "_parent_id", "id", "question", "answer")
    SELECT
      v._order,
      s.id,
      substr(md5(random()::text || clock_timestamp()::text || v._order::text), 1, 24),
      v.question,
      v.answer
    FROM "services" s,
      (VALUES
        (0, 'How long does a hot water system installation take?', 'Most replacements are completed in a single day, so you are rarely without hot water for long.'),
        (1, 'Which type of hot water system is right for me?', 'It depends on your household size, energy costs, and available space. We can talk you through the options during a quote.'),
        (2, 'How often should a hot water system be serviced?', 'Most systems benefit from an annual service to check the anode, pressure valve, and overall condition, which helps avoid breakdowns.'),
        (3, 'What size hot water system do I need?', 'This depends on your household size and hot water usage. We can recommend the right capacity when we quote your job.'),
        (4, 'Do you offer emergency hot water repairs?', 'Yes, we offer same-day emergency callouts for hot water system failures.')
      ) AS v(_order, question, answer)
    WHERE s.slug = 'hot-water-systems'
      AND NOT EXISTS (SELECT 1 FROM "services_faq" WHERE "_parent_id" = s.id);

    INSERT INTO "services_faq" ("_order", "_parent_id", "id", "question", "answer")
    SELECT
      v._order,
      s.id,
      substr(md5(random()::text || clock_timestamp()::text || v._order::text), 1, 24),
      v.question,
      v.answer
    FROM "services" s,
      (VALUES
        (0, 'How can you find a leak without digging up my property?', 'Acoustic listening devices and thermal imaging let us pinpoint a leak''s location accurately, so we only dig where we need to.'),
        (1, 'What are the signs I might have a hidden leak?', 'An unusually high water bill, damp patches on walls or floors, or the sound of running water when everything is turned off are all common signs.'),
        (2, 'How long does a leak detection inspection take?', 'Most inspections take between one and two hours, depending on the size of the property and how many areas need checking.'),
        (3, 'Can a hidden leak really increase my water bill that much?', 'Yes, even a small, continuous leak can waste thousands of litres of water over a few months, which shows up as a noticeably higher bill.'),
        (4, 'What happens after you find the leak?', 'We will explain exactly where the leak is and provide an upfront quote to repair it, so there are no surprises.')
      ) AS v(_order, question, answer)
    WHERE s.slug = 'leak-detection'
      AND NOT EXISTS (SELECT 1 FROM "services_faq" WHERE "_parent_id" = s.id);
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Remove only the specific rows this migration inserted (matched by
  // question text), so any FAQs an editor added since are left untouched.
  await db.execute(sql`
    DELETE FROM "services_faq" WHERE "question" IN (
      'How do you find the cause of a blocked drain?',
      'Will you need to dig up my yard?',
      'How much does it cost to clear a blocked drain?',
      'Can tree roots cause a blocked drain?',
      'How can I stop my drains from blocking again?',
      'How long does a hot water system installation take?',
      'Which type of hot water system is right for me?',
      'How often should a hot water system be serviced?',
      'What size hot water system do I need?',
      'Do you offer emergency hot water repairs?',
      'How can you find a leak without digging up my property?',
      'What are the signs I might have a hidden leak?',
      'How long does a leak detection inspection take?',
      'Can a hidden leak really increase my water bill that much?',
      'What happens after you find the leak?'
    );
  `)
}
