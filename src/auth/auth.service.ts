import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { PrismaService } from 'src/middlewares';
import { handleDbExceptions } from 'src/common/helpers';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.email = createUserDto.email.toLowerCase().trim();
      const { password, ...restUserData } = createUserDto;
      const user = await this.prisma.user.create({
        data: {
          ...restUserData,
          password: bcrypt.hashSync(password, 10),
        },
      });
      return {
        ...restUserData,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;
      const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });
      const errorText = getErrorMessage('E002');
      if (!user) throw new UnauthorizedException(errorText.replace('&', email));
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException(errorText.replace('&', email));
      }
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
