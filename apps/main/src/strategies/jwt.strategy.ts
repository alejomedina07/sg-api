import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configurationConfig from 'sg/core/configuration/configuration.config';
import { UserRepository } from 'sg/core/repositories/user/user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configurationConfig().main.jwt.secret,
    });
  }

  async validate(payload: any) {
    // const user = await this.userRepository.findByEmail(payload.user.email)
    return payload.user;
  }
}
