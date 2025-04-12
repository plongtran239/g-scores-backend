import { Injectable } from '@nestjs/common';

import { ScoreNotFoundException } from 'src/modules/score/score.error';
import { ScoreRepository } from 'src/modules/score/score.repo';
import { isPrismaNotFoundError } from 'src/shared/helpers';

@Injectable()
export class ScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  public async getScoreById(id: number) {
    try {
      return await this.scoreRepository.findById(id);
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw ScoreNotFoundException;
      }
      throw error;
    }
  }
}
