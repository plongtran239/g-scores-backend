import { z } from 'zod';

import { ScoreSchema } from 'src/shared/models/shared-score.model';

export const SubjectStatisticsSchema = z.object({
  subject: z.string(),
  excellent: z.number(),
  good: z.number(),
  average: z.number(),
  poor: z.number(),
});

export const GetStatisticsResponseSchema = z.object({
  subjects: z.array(SubjectStatisticsSchema),
});

export const TopGroupASchema = ScoreSchema.pick({
  id: true,
  math: true,
  physics: true,
  chemistry: true,
}).extend({
  total: z.number(),
});

export const GetTopGroupAResponseSchema = z.object({
  topScores: z.array(TopGroupASchema),
});

export type SubjectStatisticsType = z.infer<typeof SubjectStatisticsSchema>;
export type GetStatisticsResponseType = z.infer<typeof GetStatisticsResponseSchema>;
export type TopGroupAType = z.infer<typeof TopGroupASchema>;
export type GetTopGroupAResponseType = z.infer<typeof GetTopGroupAResponseSchema>;
