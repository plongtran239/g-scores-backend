import { Controller, Get, Param } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';

import { GetDetailScoreParamsDTO, GetDetailScoreResponseDTO } from 'src/modules/score/score.dto';
import { ScoreService } from 'src/modules/score/score.service';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':id')
  @ZodSerializerDto(GetDetailScoreResponseDTO)
  public async getScoreById(@Param() params: GetDetailScoreParamsDTO) {
    return this.scoreService.getScoreById(params.id);
  }
}
