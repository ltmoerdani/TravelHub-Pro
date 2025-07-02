import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@travel-agency/database';

@Injectable()
export class DocumentsService {
  constructor(private db: DatabaseService) {}

  async findAll(filters?: any) {
    // Mock documents data
    return [
      {
        id: 'DOC001',
        customerId: '1',
        bookingId: 'BK001',
        documentType: 'passport',
        documentNumber: 'A1234567',
        documentName: 'Passport - Ahmad Wijaya',
        fileName: 'passport_ahmad.pdf',
        fileSize: 2048576,
        fileType: 'pdf',
        issueDate: '2020-05-15',
        expiryDate: '2030-05-15',
        issuingAuthority: 'Immigration Office Jakarta',
        issuingCountry: 'Indonesia',
        verificationStatus: 'verified',
        verifiedAt: '2024-01-10T10:00:00Z',
        createdAt: '2024-01-05T14:30:00Z',
      },
      {
        id: 'DOC002',
        customerId: '1',
        bookingId: 'BK001',
        documentType: 'vaccination',
        documentNumber: 'VAC789',
        documentName: 'Vaccination Certificate - Ahmad Wijaya',
        fileName: 'vaccination_ahmad.pdf',
        fileSize: 1024768,
        fileType: 'pdf',
        issueDate: '2023-12-01',
        expiryDate: '2025-12-01',
        issuingAuthority: 'Ministry of Health',
        issuingCountry: 'Indonesia',
        verificationStatus: 'verified',
        verifiedAt: '2024-01-08T11:00:00Z',
        createdAt: '2024-01-05T15:00:00Z',
      },
    ];
  }

  async findOne(id: string) {
    const documents = await this.findAll();
    return documents.find(doc => doc.id === id);
  }

  async uploadDocument(file: Express.Multer.File, documentData: any) {
    // Mock file upload
    return {
      id: `DOC${Date.now()}`,
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype.split('/')[1],
      filePath: `/uploads/documents/${Date.now()}_${file.originalname}`,
      fileHash: 'mock_hash_' + Date.now(),
      ...documentData,
      verificationStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async verifyDocument(id: string, verificationData: any) {
    const { status, notes, verifiedBy } = verificationData;
    
    return {
      id,
      verificationStatus: status,
      verificationNotes: notes,
      verifiedBy,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getExpiringDocuments(params: any) {
    const { daysAhead = 30 } = params;
    
    // Mock expiring documents
    return [
      {
        id: 'DOC003',
        customerId: '2',
        customerName: 'Sarah Johnson',
        documentType: 'passport',
        documentNumber: 'B9876543',
        expiryDate: '2024-02-15',
        daysUntilExpiry: 25,
        notificationSent: false,
      },
      {
        id: 'DOC004',
        customerId: '3',
        customerName: 'Muhammad Ali',
        documentType: 'visa',
        documentNumber: 'V123456',
        expiryDate: '2024-02-20',
        daysUntilExpiry: 30,
        notificationSent: true,
      },
    ];
  }

  async generateDocument(generationData: any) {
    const { templateId, bookingId, documentType, data } = generationData;
    
    // Mock document generation
    return {
      id: `GEN${Date.now()}`,
      templateId,
      bookingId,
      documentNumber: `${documentType.toUpperCase()}-${Date.now()}`,
      documentType,
      generatedContent: '<html>Generated document content...</html>',
      generatedData: data,
      pdfPath: `/generated/documents/${Date.now()}_${documentType}.pdf`,
      status: 'final',
      generatedBy: 'system',
      createdAt: new Date(),
    };
  }

  async getTemplates(filters?: any) {
    // Mock document templates
    return [
      {
        id: 'TPL001',
        templateName: 'Umroh Invoice Template',
        templateType: 'invoice',
        category: 'umroh',
        description: 'Standard invoice template for Umroh packages',
        isActive: true,
        isDefault: true,
        previewImage: '/templates/previews/umroh_invoice.png',
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: 'TPL002',
        templateName: 'Travel Voucher Template',
        templateType: 'voucher',
        category: 'travel',
        description: 'Travel voucher with itinerary details',
        isActive: true,
        isDefault: false,
        previewImage: '/templates/previews/travel_voucher.png',
        createdAt: '2023-01-01T00:00:00Z',
      },
      {
        id: 'TPL003',
        templateName: 'Umroh Contract Template',
        templateType: 'contract',
        category: 'umroh',
        description: 'Shariah-compliant Umroh service contract',
        isActive: true,
        isDefault: true,
        previewImage: '/templates/previews/umroh_contract.png',
        createdAt: '2023-01-01T00:00:00Z',
      },
    ];
  }

  async createTemplate(templateData: any) {
    return {
      id: `TPL${Date.now()}`,
      ...templateData,
      isActive: true,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}