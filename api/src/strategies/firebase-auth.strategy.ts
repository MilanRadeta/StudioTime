import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as FirebaseJwtStrategy } from "passport-firebase-jwt";
import { FIREBASE_ADMIN_APP } from "src/firebase/firebase.admin";

export const FirebaseAuthStrategyName = 'firebase-auth'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  FirebaseJwtStrategy,
  FirebaseAuthStrategyName,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(token: string) {
    const firebaseUser: any = await FIREBASE_ADMIN_APP
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }
}