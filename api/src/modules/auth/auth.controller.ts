import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { FirebaseErrorFilter } from 'src/exception-filters/firebase-exception.filter';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@UseFilters(FirebaseErrorFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }
}
