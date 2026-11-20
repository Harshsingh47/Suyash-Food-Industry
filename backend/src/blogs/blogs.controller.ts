import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async getAll(@Query('all') all?: string) {
    return this.blogsService.findAll(all !== 'true');
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Post()
  async create(@Body() body: any) {
    return this.blogsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.blogsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogsService.delete(id);
  }
}
