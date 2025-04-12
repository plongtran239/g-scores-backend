import { z } from 'zod';

import { ScoreSchema } from 'src/shared/models/shared-score.model';

export const GetDetailScoreParamsSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export const GetDetailScoreResponseSchema = ScoreSchema;

export type GetDetailScoreParamsType = z.infer<typeof GetDetailScoreParamsSchema>;
export type GetDetailScoreResponseType = z.infer<typeof GetDetailScoreResponseSchema>;
