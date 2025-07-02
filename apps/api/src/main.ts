import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins in development
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3002', 'https://travelhub.pro'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Global validation pipe with detailed error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: 422,
    }),
  );

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('TravelHub Pro API')
    .setDescription('All-in-One Travel Agency SaaS Platform API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Products', 'Travel packages, hotels, and Umroh/Haji management')
    .addTag('Bookings', 'Booking management and processing')
    .addTag('Customers', 'Customer relationship management')
    .addTag('Payments', 'Payment processing and financial transactions')
    .addTag('Analytics', 'Business intelligence and reporting')
    .addTag('Umroh & Islamic Services', 'Islamic tourism specialized features')
    .addTag('Inventory Management', 'Dynamic pricing and inventory control')
    .addTag('Agent Management', 'Sales agent productivity and commission tracking')
    .addTag('Document Management', 'Document processing and compliance')
    .addTag('Marketing & Promotions', 'Marketing automation and campaign management')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'TravelHub Pro API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0 }
      .swagger-ui .info .title { color: #1e40af }
    `,
  });

  // Global prefix for all API routes
  app.setGlobalPrefix('api', {
    exclude: ['health', 'metrics'],
  });

  // Health check endpoint
  app.getHttpAdapter().get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    });
  });

  const port = process.env.API_PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 TravelHub Pro API running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`💚 Health Check: http://localhost:${port}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});