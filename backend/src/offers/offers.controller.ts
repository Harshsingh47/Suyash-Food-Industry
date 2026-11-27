import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  // ==========================================
  // Combo Offers (Bundles) Endpoints
  // (Must come before :id to prevent collision)
  // ==========================================

  @Get('combos')
  async getCombos(@Query('all') all?: string) {
    return this.offersService.findCombos(all !== 'true');
  }

  @Get('combos/:slug')
  async getComboBySlug(@Param('slug') slug: string) {
    return this.offersService.findComboByIdOrSlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Post('combos')
  async createCombo(@Body() body: any) {
    return this.offersService.createCombo(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Put('combos/:id')
  async updateCombo(@Param('id') id: string, @Body() body: any) {
    return this.offersService.updateCombo(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Patch('combos/:id/toggle')
  async toggleCombo(@Param('id') id: string) {
    return this.offersService.toggleComboActive(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Delete('combos/:id')
  async deleteCombo(@Param('id') id: string) {
    return this.offersService.deleteCombo(id);
  }

  // ==========================================
  // Standard Offers / Banners Endpoints
  // ==========================================

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
