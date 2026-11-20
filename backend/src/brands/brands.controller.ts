import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async getAll() {
    return this.brandsService.findAll();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.brandsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Post()
  async create(@Body() body: any) {
    return this.brandsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.brandsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }
}
