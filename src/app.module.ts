import { SharedModule } from './shared/shared.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';

import { ReportModule } from 'src/modules/report/report.module';
import { ScoreModule } from 'src/modules/score/score.module';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';
import CustomZodValidationPipe from 'src/shared/pipes/zod-validation.pipe';

@Module({
  imports: [SharedModule, ScoreModule, ReportModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
