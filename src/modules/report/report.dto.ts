import { createZodDto } from 'nestjs-zod';

import { GetStatisticsResponseSchema, GetTopGroupAResponseSchema } from 'src/modules/report/report.model';

export class GetStatisticsResponseDTO extends createZodDto(GetStatisticsResponseSchema) {}

export class GetTopGroupAResponseDTO extends createZodDto(GetTopGroupAResponseSchema) {}
