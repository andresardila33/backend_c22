import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';
import { PrismaService } from 'src/middlewares';
import { OrderDetail } from '@prisma/client';
import { handleDbExceptions } from 'src/common/helpers';
import { PaginationDto } from 'src/common/dto';
import { isUUID } from 'class-validator';
import { getErrorMessage } from 'src/common/messages/error_messages';

@Injectable()
export class OrdersDetailsService {
  constructor(private prisma: PrismaService) {}
  private ordersDetails: OrderDetail[] = []; //TODO: Refactor handle cache

  async create(
    createOrdersDetailDto: CreateOrdersDetailDto,
  ): Promise<CreateOrdersDetailDto> {
    try {
      return await this.prisma.orderDetail.create({
        data: createOrdersDetailDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.ordersDetails = await this.prisma.orderDetail.findMany({
        include: {
          orderBill: true,
          dish: true,
        },
      });
      const totalOrdersDetails: number = this.ordersDetails.length;
      const totalPages: number = Math.ceil(totalOrdersDetails / limit);
      const ordersDetailsReturn: OrderDetail[] = this.ordersDetails.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...ordersDetailsReturn],
        meta: {
          totalOrdersDetails: totalOrdersDetails,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<OrderDetail> {
    const orderDetail: OrderDetail = await this.findByTerm(term);
    if (!orderDetail) {
      const errorText = getErrorMessage('E001');
      throw new NotFoundException(errorText.replace('&', term));
    }
    return orderDetail;
  }

  async update(_id: string, updateOrdersDetailDto: UpdateOrdersDetailDto) {
    try {
      return await this.prisma.orderDetail.update({
        where: { id: _id },
        data: updateOrdersDetailDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.orderDetail.delete({
        where: { id: _id },
      });
      return { message: `The order-detail with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<OrderDetail> {
    const bool: boolean = isUUID(term);
    if (bool) {
      const orderDetail: OrderDetail = await this.prisma.orderDetail.findFirst({
        where: { id: term },
        include: {
          orderBill: true,
          dish: true,
        },
      });
      return orderDetail;
    }
  }
}
