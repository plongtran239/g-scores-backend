import { Injectable } from '@nestjs/common';

import { ScoreType } from 'src/shared/models/shared-score.model';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<ScoreType | null> {
    return this.prisma.score.findUniqueOrThrow({
      where: { id },
    });
  }
}
