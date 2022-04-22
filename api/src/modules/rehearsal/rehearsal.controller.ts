import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Rehearsal } from './entities/rehearsal.entity';
import { RehearsalService } from './rehearsal.service';
import { PartialType } from "@nestjs/mapped-types";
import { UpdateRehearsalDto } from './dto/update-rehearsal.dto';

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
