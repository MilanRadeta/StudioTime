import { Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from 'src/modules/shared/firebase/firebase.client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  async login(loginDto: LoginDto) {
    const { user } = await signInWithEmailAndPassword(FIREBASE_AUTH, loginDto.email, loginDto.password);
    return await user.getIdToken();
  }

  async signup(loginDto: LoginDto) {
    const { user } = await createUserWithEmailAndPassword(FIREBASE_AUTH, loginDto.email, loginDto.password);
    return await user.getIdToken();
  }
}
