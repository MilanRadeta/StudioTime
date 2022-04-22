import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Request() { user }: { user: DecodedIdToken }, @Body() createUserDto: User) {
    return this.userService.save({ ...createUserDto, uid: user.uid });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') uid: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.update({ ...updateUserDto, uid });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
