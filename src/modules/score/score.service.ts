import { Injectable } from '@nestjs/common';

import { ScoreNotFoundException } from 'src/modules/score/score.error';
import { isPrismaNotFoundError } from 'src/shared/helpers';
import { ScoreType } from 'src/shared/models/shared-score.model';
import { SharedScoreRepository } from 'src/shared/repositories/shared-score.repository';

@Injectable()
export class ScoreService {
  constructor(private readonly sharedScoreRepository: SharedScoreRepository) {}

  public async getScoreById(id: number): Promise<ScoreType | null> {
    try {
      return await this.sharedScoreRepository.findById(id);
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw ScoreNotFoundException;
      }
      throw error;
    }
  }
}
