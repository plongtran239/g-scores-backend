import { NotFoundException } from '@nestjs/common';

export const ScoreNotFoundException = new NotFoundException('Score not found');
