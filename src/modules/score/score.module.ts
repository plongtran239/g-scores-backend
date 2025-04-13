import { Module } from '@nestjs/common';

import { ScoreController } from 'src/modules/score/score.controller';
import { ScoreService } from 'src/modules/score/score.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
