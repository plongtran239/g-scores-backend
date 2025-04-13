import { Injectable } from '@nestjs/common';

// import { SubjectStatisticsType } from 'src/modules/report/report.model';
import { GroupAScoreType, ScoreType } from 'src/shared/models/shared-score.model';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SharedScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<ScoreType | null> {
    return this.prisma.score.findUniqueOrThrow({
      where: { id },
    });
  }

  public async findTopGroupA(): Promise<GroupAScoreType[]> {
    return this.prisma.$queryRawUnsafe<GroupAScoreType[]>(`
      SELECT id, math, physics, chemistry, 
             (math + physics + chemistry) AS total
      FROM "Score"
      WHERE math IS NOT NULL AND physics IS NOT NULL AND chemistry IS NOT NULL
      ORDER BY total DESC
      LIMIT 10
    `);
  }

  public async statistics() {
    const statistics = await this.prisma.$queryRawUnsafe<
      {
        subject: string;
        excellent: number;
        good: number;
        average: number;
        poor: number;
      }[]
    >(`
      SELECT 'math' AS subject,
        COUNT(*) FILTER (WHERE math >= 8) AS excellent,
        COUNT(*) FILTER (WHERE math >= 6.5 AND math < 8) AS good,
        COUNT(*) FILTER (WHERE math >= 5 AND math < 6.5) AS average,
        COUNT(*) FILTER (WHERE math < 5) AS poor
      FROM "Score"

      UNION ALL
      SELECT 'literature',
        COUNT(*) FILTER (WHERE literature >= 8),
        COUNT(*) FILTER (WHERE literature >= 6.5 AND literature < 8),
        COUNT(*) FILTER (WHERE literature >= 5 AND literature < 6.5),
        COUNT(*) FILTER (WHERE literature < 5)
      FROM "Score"

      UNION ALL
      SELECT 'foreignLanguage',
        COUNT(*) FILTER (WHERE "foreignLanguage" >= 8),
        COUNT(*) FILTER (WHERE "foreignLanguage" >= 6.5 AND "foreignLanguage" < 8),
        COUNT(*) FILTER (WHERE "foreignLanguage" >= 5 AND "foreignLanguage" < 6.5),
        COUNT(*) FILTER (WHERE "foreignLanguage" < 5)
      FROM "Score"

      UNION ALL
      SELECT 'physics',
        COUNT(*) FILTER (WHERE physics >= 8),
        COUNT(*) FILTER (WHERE physics >= 6.5 AND physics < 8),
        COUNT(*) FILTER (WHERE physics >= 5 AND physics < 6.5),
        COUNT(*) FILTER (WHERE physics < 5)
      FROM "Score"

      UNION ALL
      SELECT 'chemistry',
        COUNT(*) FILTER (WHERE chemistry >= 8),
        COUNT(*) FILTER (WHERE chemistry >= 6.5 AND chemistry < 8),
        COUNT(*) FILTER (WHERE chemistry >= 5 AND chemistry < 6.5),
        COUNT(*) FILTER (WHERE chemistry < 5)
      FROM "Score"

      UNION ALL
      SELECT 'biology',
        COUNT(*) FILTER (WHERE biology >= 8),
        COUNT(*) FILTER (WHERE biology >= 6.5 AND biology < 8),
        COUNT(*) FILTER (WHERE biology >= 5 AND biology < 6.5),
        COUNT(*) FILTER (WHERE biology < 5)
      FROM "Score"

      UNION ALL
      SELECT 'history',
        COUNT(*) FILTER (WHERE history >= 8),
        COUNT(*) FILTER (WHERE history >= 6.5 AND history < 8),
        COUNT(*) FILTER (WHERE history >= 5 AND history < 6.5),
        COUNT(*) FILTER (WHERE history < 5)
      FROM "Score"

      UNION ALL
      SELECT 'geography',
        COUNT(*) FILTER (WHERE geography >= 8),
        COUNT(*) FILTER (WHERE geography >= 6.5 AND geography < 8),
        COUNT(*) FILTER (WHERE geography >= 5 AND geography < 6.5),
        COUNT(*) FILTER (WHERE geography < 5)
      FROM "Score"

      UNION ALL
      SELECT 'civics',
        COUNT(*) FILTER (WHERE civics >= 8),
        COUNT(*) FILTER (WHERE civics >= 6.5 AND civics < 8),
        COUNT(*) FILTER (WHERE civics >= 5 AND civics < 6.5),
        COUNT(*) FILTER (WHERE civics < 5)
      FROM "Score"
    `);

    return statistics;
  }

  public async getDashboardStats() {
    const result = await this.prisma.$queryRawUnsafe<
      {
        total: bigint;
        average_score: number;
        excellent_count: bigint;
      }[]
    >(`
        SELECT
        COUNT(*) AS total,
        AVG(total_score / NULLIF(subject_count, 0)) AS average_score,
        COUNT(*) FILTER (WHERE (total_score / NULLIF(subject_count, 0)) >= 8) AS excellent_count
        FROM (
          SELECT
            (
              COALESCE("math", 0) +
              COALESCE("literature", 0) +
              COALESCE("foreignLanguage", 0) +
              COALESCE("physics", 0) +
              COALESCE("chemistry", 0) +
              COALESCE("biology", 0) +
              COALESCE("history", 0) +
              COALESCE("geography", 0) +
              COALESCE("civics", 0)
            ) AS total_score,
          (
            (CASE WHEN "math" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "literature" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "foreignLanguage" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "physics" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "chemistry" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "biology" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "history" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "geography" IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN "civics" IS NOT NULL THEN 1 ELSE 0 END)
          ) AS subject_count
            FROM "Score"
          ) AS calculated;
            `);

    const parsed = result[0];

    return {
      total: Number(parsed.total),
      averageScore: Number(parsed.average_score.toFixed(3)),
      excellentCount: Number(parsed.excellent_count),
    };
  }
}
