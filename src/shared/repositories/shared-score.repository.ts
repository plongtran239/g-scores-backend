import { Injectable } from '@nestjs/common';

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

  public async findAll(): Promise<ScoreType[]> {
    return this.prisma.score.findMany();
  }

  public async findGroupA(): Promise<GroupAScoreType[]> {
    return this.prisma.score.findMany({
      where: {
        math: {
          not: null,
        },
        physics: {
          not: null,
        },
        chemistry: {
          not: null,
        },
      },
      select: {
        id: true,
        math: true,
        physics: true,
        chemistry: true,
      },
    });
  }
}
