import { Global, Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/services/prisma.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
