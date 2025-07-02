import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  globalSearch(@Query() params: any) {
    return this.searchService.globalSearch(params);
  }

  @Get('products')
  searchProducts(@Query() params: any) {
    return this.searchService.searchProducts(params);
  }

  @Get('customers')
  searchCustomers(@Query() params: any) {
    return this.searchService.searchCustomers(params);
  }

  @Get('bookings')
  searchBookings(@Query() params: any) {
    return this.searchService.searchBookings(params);
  }

  @Get('suggestions')
  getSearchSuggestions(@Query('q') query: string) {
    return this.searchService.getSearchSuggestions(query);
  }

  @Get('filters')
  getAvailableFilters(@Query('type') type: string) {
    return this.searchService.getAvailableFilters(type);
  }
}