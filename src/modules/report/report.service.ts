import { Injectable } from '@nestjs/common';

import {
  GetStatisticsResponseType,
  GetTopGroupAResponseType,
  SubjectStatisticsType,
} from 'src/modules/report/report.model';
import { Category, Subjects } from 'src/shared/constants';
import { SharedScoreRepository } from 'src/shared/repositories/shared-score.repository';

@Injectable()
export class ReportService {
  constructor(private readonly sharedScoreRepository: SharedScoreRepository) {}

  public async getStatistics(): Promise<GetStatisticsResponseType> {
    const scores = await this.sharedScoreRepository.findAll();

    const statistics: SubjectStatisticsType[] = [];

    for (const subject of Subjects) {
      const summary = {
        subject,
        excellent: 0,
        good: 0,
        average: 0,
        poor: 0,
      };

      for (const score of scores) {
        const category = this.categorizeScore(score[subject]);

        if (category) {
          summary[category]++;
        }
      }

      statistics.push(summary);
    }

    return {
      subjects: statistics,
    };
  }

  public async getTopGroupA(): Promise<GetTopGroupAResponseType> {
    const scores = await this.sharedScoreRepository.findGroupA();

    const topScores = scores.map((score) => ({
      ...score,
      total: (score.math as number) + (score.physics as number) + (score.chemistry as number),
    }));

    return {
      topScores: topScores.sort((a, b) => b.total - a.total).slice(0, 10),
    };
  }

  private categorizeScore(score: number | null): Category | null {
    if (score === null) return null;
    if (score >= 8) return 'excellent';
    if (score >= 6.5) return 'good';
    if (score >= 5) return 'average';
    return 'poor';
  }
}
