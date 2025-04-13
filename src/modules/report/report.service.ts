import { Injectable } from '@nestjs/common';

import { GetDashboardResponseType, GetTopGroupAResponseType } from 'src/modules/report/report.model';
import { SharedScoreRepository } from 'src/shared/repositories/shared-score.repository';

@Injectable()
export class ReportService {
  constructor(private readonly sharedScoreRepository: SharedScoreRepository) {}

  public async getStatistics() {
    const statistics = await this.sharedScoreRepository.statistics();

    const formattedStatistics = statistics.map((stat) => ({
      subject: stat.subject,
      excellent: Number(stat.excellent),
      good: Number(stat.good),
      average: Number(stat.average),
      poor: Number(stat.poor),
    }));

    return {
      subjects: formattedStatistics,
    };
  }

  public async getTopGroupA(): Promise<GetTopGroupAResponseType> {
    const topScores = await this.sharedScoreRepository.findTopGroupA();

    return {
      topScores,
    };
  }

  public async getDashboard(): Promise<GetDashboardResponseType> {
    const data = await this.sharedScoreRepository.getDashboardStats();

    return {
      totalStudents: data.total,
      averageScore: data.averageScore,
      excellentStudents: data.excellentCount,
    };
  }
}
