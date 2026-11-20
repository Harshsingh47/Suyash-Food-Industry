import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.MANAGER)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  async getAll(@Query() query: any) {
    return this.inventoryService.findAll(query);
  }

  @Post('adjust')
  async adjustStock(@Body() body: any, @Request() req: any) {
    return this.inventoryService.adjustStock({
      ...body,
      userId: req.user.id,
    });
  }

  @Get('history/:productId')
  async getHistory(@Param('productId') productId: string) {
    return this.inventoryService.getHistory(productId);
  }
}
