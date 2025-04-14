import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder().setTitle('G-Scores API').setDescription('');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());

  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: false,
    },
  });
}
