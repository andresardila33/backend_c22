import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/middlewares/prisma-service';
import { CreateWaiterDto, UpdateWaiterDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { Waiter } from './entities/waiter.entity';
import { handleDbExceptions } from 'src/common/helpers';
import { getErrorMessage } from 'src/common/messages/error_messages';

@Injectable()
export class WaitersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger: Logger = new Logger('WaitersService');
  private waiters: Waiter[] = []; //TODO: Refactor handle cache

  async create(createWaiterDto: CreateWaiterDto): Promise<CreateWaiterDto> {
    try {
      return await this.prisma.waiter.create({
        data: createWaiterDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      if (this.waiters.length === 0) {
        this.waiters = await this.prisma.waiter.findMany();
      }
      const totalWaiters: number = this.waiters.length;
      const totalPages: number = Math.ceil(totalWaiters / limit);
      const waitersReturn: Waiter[] = this.waiters.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...waitersReturn],
        meta: {
          totalWaiters: totalWaiters,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Waiter> {
    const waiter: Waiter = await this.findByTerm(term);
    if (!waiter) {
      const errorText = getErrorMessage('E001');
      if (errorText) {
        throw new NotFoundException(errorText.replace('&', term));
      }
    }
    return waiter;
  }

  async update(_id: string, updateWaiterDto: UpdateWaiterDto) {
    try {
      return await this.prisma.waiter.update({
        where: { id: _id },
        data: updateWaiterDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.waiter.delete({
        where: { id: _id },
      });
      return { message: `The waiter with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<Waiter> {
    const waiter: Waiter = isUUID(term)
      ? await this.prisma.waiter.findFirst({
          where: { id: term },
        })
      : await this.prisma.waiter.findFirst({
          where: {
            OR: [
              { name: { equals: term, mode: 'insensitive' } },
              { userName: { equals: term, mode: 'insensitive' } },
            ],
          },
        });
    return waiter;
  }
}
