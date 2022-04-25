import { Body, Controller, Delete, Get, Param, Patch, Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { StudioService } from './studio.service';

@Controller('studio')
export class StudioController {
  constructor(
    private readonly studioService: StudioService
  ) { }

  @Get()
  findAll() {
    return this.studioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studioService.findOne(id);
  }

  @Patch(':id')
  update(@Request() { user }: { user: DecodedIdToken }, @Param('id') uid: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studioService.update({ ...updateStudioDto, uid }, { user });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioService.remove(id);
  }
}
