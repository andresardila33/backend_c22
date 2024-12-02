import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PrismaService } from '../../middlewares/prisma-service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { envs } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: envs.jwt_secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      const errorText = getErrorMessage('E003');
      throw new UnauthorizedException(errorText);
    }
    if (!user.isActive) {
      const errorText = getErrorMessage('E004');
      throw new UnauthorizedException(errorText);
    }
    return user;
  }
}
