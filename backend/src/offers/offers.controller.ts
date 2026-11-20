import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  async getAll(@Query('all') all?: string) {
    return this.offersService.findAll(all !== 'true');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Post()
  async create(@Body() body: any) {
    return this.offersService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.offersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.offersService.delete(id);
  }
}
