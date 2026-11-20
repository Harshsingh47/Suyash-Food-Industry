import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role, EnquiryStatus } from '@prisma/client';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private enquiriesService: EnquiriesService) {}

  // Public endpoint for submitting product enquiries
  @Post()
  async createEnquiry(@Body() body: any) {
    return this.enquiriesService.create(body);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Get('stats')
  async getStats() {
    return this.enquiriesService.getStats();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Query() query: any) {
    return this.enquiriesService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.enquiriesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: EnquiryStatus; comment?: string },
    @Request() req: any,
  ) {
    return this.enquiriesService.updateStatus(id, body.status, body.comment, req.user?.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Post(':id/notes')
  async addNote(
    @Param('id') id: string,
    @Body() body: { note: string; followUpDate?: string },
    @Request() req: any,
  ) {
    return this.enquiriesService.addNote(id, body.note, body.followUpDate, req.user?.id);
  }
}
