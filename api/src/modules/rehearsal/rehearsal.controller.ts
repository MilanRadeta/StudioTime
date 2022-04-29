import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UpdateRehearsalDto } from './dto/update-rehearsal.dto';
import { Rehearsal } from './entities/rehearsal.entity';
import { RehearsalService } from './rehearsal.service';

@Controller('rehearsal')
export class RehearsalController {
  constructor(private readonly rehearsalService: RehearsalService) { }

  @Post("studio/:id")
  create(
    @Request() { user }: { user: DecodedIdToken },
    @Body() rehearsal: Rehearsal,
    @Param('id') studioId: string
  ) {
    return this.rehearsalService.create({
      ...rehearsal,
      clientId: user.uid,
      studioId
    });
  }

  @Get("studio/:id")
  findByStudioId(@Param('id') id: string) {
    return this.rehearsalService.findByStudioId(id);
  }

  @Get('studio/:id/available')
  findAvailablePeriods(@Param('id') id: string, @Query('date', ParseIntPipe) date: number, @Query('room') room?: string) {
    return this.rehearsalService.findAvailablePeriods(id, new Date(date), room);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rehearsalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateRehearsalDto: UpdateRehearsalDto) {
    return this.rehearsalService.update({ ...updateRehearsalDto, uid });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rehearsalService.remove(id);
  }
}
