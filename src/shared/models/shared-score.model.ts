import { z } from 'zod';

export const ScoreSchema = z.object({
  id: z.number(),
  math: z.number().optional(),
  literature: z.number().optional(),
  foreignLanguage: z.number().optional(),
  physics: z.number().optional(),
  chemistry: z.number().optional(),
  biology: z.number().optional(),
  history: z.number().optional(),
  geography: z.number().optional(),
  civics: z.number().optional(),
  foreignLanguageCode: z.string().optional(),
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

export type ScoreType = z.infer<typeof ScoreSchema>;

export type CsvScoreType = z.infer<typeof CsvScoreSchema>;
