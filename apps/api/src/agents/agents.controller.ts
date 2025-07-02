import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Agent Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Get()
  findAll(@Query() filters: any) {
    return this.agentsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Post()
  create(@Body() agentData: any) {
    return this.agentsService.create(agentData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.agentsService.update(id, updateData);
  }

  @Get(':id/performance')
  getPerformance(@Param('id') id: string, @Query() params: any) {
    return this.agentsService.getPerformance(id, params);
  }

  @Get(':id/commissions')
  getCommissions(@Param('id') id: string, @Query() params: any) {
    return this.agentsService.getCommissions(id, params);
  }

  @Post(':id/tasks')
  createTask(@Param('id') id: string, @Body() taskData: any) {
    return this.agentsService.createTask(id, taskData);
  }

  @Get(':id/tasks')
  getTasks(@Param('id') id: string, @Query() filters: any) {
    return this.agentsService.getTasks(id, filters);
  }

  @Patch('tasks/:taskId')
  updateTask(@Param('taskId') taskId: string, @Body() updateData: any) {
    return this.agentsService.updateTask(taskId, updateData);
  }
}