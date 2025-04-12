import { createZodDto } from 'nestjs-zod';

import { GetDetailScoreParamsSchema, GetDetailScoreResponseSchema } from 'src/modules/score/score.model';

export class GetDetailScoreParamsDTO extends createZodDto(GetDetailScoreParamsSchema) {}

export class GetDetailScoreResponseDTO extends createZodDto(GetDetailScoreResponseSchema) {}
