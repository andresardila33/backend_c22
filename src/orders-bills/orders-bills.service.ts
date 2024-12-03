import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBill } from '@prisma/client';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/middlewares';
import { CreateOrdersBillDto, UpdateOrdersBillDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { handleDbExceptions } from 'src/common/helpers';
import { getErrorMessage } from 'src/common/messages/error_messages';

@Injectable()
export class OrdersBillsService {
  constructor(private prisma: PrismaService) {}
  private ordersBills: OrderBill[] = []; //TODO: Refactor handle cache

  async create(
    createOrdersBillDto: CreateOrdersBillDto,
  ): Promise<CreateOrdersBillDto> {
    try {
      return await this.prisma.orderBill.create({
        data: createOrdersBillDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.ordersBills = await this.prisma.orderBill.findMany({
        include: {
          client: true,
          user: true,
          table: true,
        },
      });
      const totalOrdersBills: number = this.ordersBills.length;
      const totalPages: number = Math.ceil(totalOrdersBills / limit);
      const ordersBillsReturn: OrderBill[] = this.ordersBills.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...ordersBillsReturn],
        meta: {
          totalOrdersBills: totalOrdersBills,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<OrderBill> {
    const orderBill: OrderBill = await this.findByTerm(term);
    if (!orderBill) {
      const errorText = getErrorMessage('E001');
      throw new NotFoundException(errorText.replace('&', term));
    }
    return orderBill;
  }

  async update(_id: string, updateOrdersBillDto: UpdateOrdersBillDto) {
    try {
      return await this.prisma.orderBill.update({
        where: { id: _id },
        data: updateOrdersBillDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.orderBill.delete({
        where: { id: _id },
      });
      return { message: `The order-bill with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<OrderBill> {
    const bool: boolean = isUUID(term);
    if (bool) {
      const orderBill: OrderBill = await this.prisma.orderBill.findFirst({
        where: { id: term },
        include: {
          client: true,
          user: true,
          table: true,
        },
      });
      return orderBill;
    }
  }
}
