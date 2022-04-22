import { Body, Controller, Post, SetMetadata, UseFilters } from '@nestjs/common';
import { FirebaseErrorFilter } from 'src/exception-filters/firebase-exception.filter';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@UseFilters(FirebaseErrorFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  @SetMetadata('public', true)
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("/signup")
  @SetMetadata('public', true)
  public signup(@Body() loginDto: LoginDto) {
    return this.authService.signup(loginDto);
  }
}
