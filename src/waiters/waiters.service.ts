import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isUUID } from 'class-validator';
import { CreateWaiterDto, UpdateWaiterDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Waiter } from './entities/waiter.entity';
import {
  getErrorDbMessage,
  getErrorMessage,
} from 'src/common/messages/error_messages';

@Injectable()
export class WaitersService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('WaitersService');
  private waiters: Waiter[] = []; //TODO: Refactor handle cache

  onModuleInit(): void {
    try {
      this.$connect();
      this.logger.log('Database connected');
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async create(createWaiterDto: CreateWaiterDto): Promise<CreateWaiterDto> {
    try {
      return await this.waiter.create({
        data: createWaiterDto,
      });
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      if (this.waiters.length === 0) {
        this.waiters = await this.waiter.findMany();
      }
      const totalProducts: number = this.waiters.length;
      const totalPages: number = Math.ceil(totalProducts / limit);
      const waitersReturn: Waiter[] = this.waiters.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...waitersReturn],
        meta: {
          totalProducts: totalProducts,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Waiter> {
    const product: Waiter = await this.findByTerm(term);
    if (!product) {
      const errorText = getErrorMessage('E001');
      console.log(errorText);
      if (errorText) {
        throw new NotFoundException(errorText.replace('&', term));
      }
    }
    return product;
  }

  async update(_id: string, updateWaiterDto: UpdateWaiterDto) {
    try {
      return await this.waiter.update({
        where: { id: _id },
        data: updateWaiterDto,
      });
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.waiter.delete({
        where: { id: _id },
      });
      return { message: `The product with id: "${_id}" was deleted` };
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  private handleDbExceptions(error) {
    const { code, meta } = error;
    if (code) {
      const errorMsg = getErrorDbMessage(code);
      const errorMessage = {
        type: 'Error',
        message: errorMsg,
        ...meta,
      };
      this.logger.error(JSON.stringify(errorMessage));
      throw new BadRequestException(errorMessage);
    } else {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  private async findByTerm(term: string): Promise<Waiter> {
    const product: Waiter = isUUID(term)
      ? await this.waiter.findFirst({
          where: { id: term },
        })
      : await this.waiter.findFirst({
          where: {
            OR: [
              { name: { equals: term, mode: 'insensitive' } },
              { userName: { equals: term, mode: 'insensitive' } },
            ],
          },
        });
    return product;
  }
}
