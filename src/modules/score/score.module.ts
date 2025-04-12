import { Module } from '@nestjs/common';

import { ScoreController } from 'src/modules/score/score.controller';
import { ScoreRepository } from 'src/modules/score/score.repo';
import { ScoreService } from 'src/modules/score/score.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
