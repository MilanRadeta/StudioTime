import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entities/studio.entity';
import { StudioService } from './studio.service';

@Controller('studio')
export class StudioController {
  constructor(
    private readonly studioService: StudioService
  ) { }

  @Post()
  create(@Request() { user }: { user: DecodedIdToken }, @Body() createStudioDto: Studio) {
    const managers = new Set(createStudioDto.managers);
    managers.add(user.uid);
    return this.studioService.create({ ...createStudioDto, managers: [...managers] });
  }

  @Get()
  findAll() {
    return this.studioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studioService.update({ ...updateStudioDto, uid });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioService.remove(id);
  }
}
