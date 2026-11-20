import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller()
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('contact')
  async submitMessage(@Body() body: any) {
    return this.contactService.submitMessage(body);
  }

  @Post('newsletter')
  async subscribeNewsletter(@Body('email') email: string) {
    return this.contactService.subscribeNewsletter(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Get('contact/messages')
  async getMessages(@Query('unresolved') unresolved?: string) {
    return this.contactService.findAllMessages(unresolved === 'true');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Put('contact/messages/:id/resolve')
  async resolveMessage(@Param('id') id: string, @Body('notes') notes?: string) {
    return this.contactService.resolveMessage(id, notes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.MANAGER)
  @Get('newsletter/subscribers')
  async getSubscribers() {
    return this.contactService.getSubscribers();
  }
}
