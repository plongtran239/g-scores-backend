import { z } from 'zod';

export const ScoreSchema = z.object({
  id: z.number(),
  math: z.number().nullable(),
  literature: z.number().nullable(),
  foreignLanguage: z.number().nullable(),
  physics: z.number().nullable(),
  chemistry: z.number().nullable(),
  biology: z.number().nullable(),
  history: z.number().nullable(),
  geography: z.number().nullable(),
  civics: z.number().nullable(),
  foreignLanguageCode: z.string().nullable(),
});

export const CsvScoreSchema = z.object({
  sbd: z.string(),
  toan: z.string(),
  ngu_van: z.string(),
  ngoai_ngu: z.string(),
  vat_li: z.string(),
  hoa_hoc: z.string(),
  sinh_hoc: z.string(),
  lich_su: z.string(),
  dia_li: z.string(),
  gdcd: z.string(),
  ma_ngoai_ngu: z.string(),
});

export const GroupAScoreSchema = ScoreSchema.pick({
  id: true,
  math: true,
  physics: true,
  chemistry: true,
});

export type ScoreType = z.infer<typeof ScoreSchema>;

export type CsvScoreType = z.infer<typeof CsvScoreSchema>;

export type GroupAScoreType = z.infer<typeof GroupAScoreSchema>;
