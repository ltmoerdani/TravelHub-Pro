import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Document Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.documentsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(@UploadedFile() file: Express.Multer.File, @Body() documentData: any) {
    return this.documentsService.uploadDocument(file, documentData);
  }

  @Patch(':id/verify')
  verifyDocument(@Param('id') id: string, @Body() verificationData: any) {
    return this.documentsService.verifyDocument(id, verificationData);
  }

  @Get('expiring')
  getExpiringDocuments(@Query() params: any) {
    return this.documentsService.getExpiringDocuments(params);
  }

  @Post('generate')
  generateDocument(@Body() generationData: any) {
    return this.documentsService.generateDocument(generationData);
  }

  @Get('templates')
  getTemplates(@Query() filters: any) {
    return this.documentsService.getTemplates(filters);
  }

  @Post('templates')
  createTemplate(@Body() templateData: any) {
    return this.documentsService.createTemplate(templateData);
  }
}