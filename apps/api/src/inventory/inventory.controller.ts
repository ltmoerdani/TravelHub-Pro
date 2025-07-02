import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inventory Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.inventoryService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Post()
  create(@Body() inventoryData: any) {
    return this.inventoryService.create(inventoryData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.inventoryService.update(id, updateData);
  }

  @Get(':id/availability')
  checkAvailability(@Param('id') id: string, @Query() params: any) {
    return this.inventoryService.checkAvailability(id, params);
  }

  @Post(':id/allocate')
  allocateInventory(@Param('id') id: string, @Body() allocationData: any) {
    return this.inventoryService.allocateInventory(id, allocationData);
  }

  @Post(':id/release')
  releaseInventory(@Param('id') id: string, @Body() releaseData: any) {
    return this.inventoryService.releaseInventory(id, releaseData);
  }

  @Get('pricing/calculate')
  calculatePrice(@Query() params: any) {
    return this.inventoryService.calculateDynamicPrice(params);
  }
}