import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/middlewares/prisma-service';
import { CreateDishDto, UpdateDishDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { handleDbExceptions } from 'src/common/helpers';
import { Dish } from './entities/dish.entity';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { isUUID } from 'class-validator';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger: Logger = new Logger('DishesService');
  private dishes: Dish[] = []; //TODO: Refactor handle cache

  async create(createDishDto: CreateDishDto): Promise<CreateDishDto> {
    try {
      return await this.prisma.dish.create({
        data: createDishDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      if (this.dishes.length === 0) {
        this.dishes = await this.prisma.dish.findMany();
      }
      const totalDishes: number = this.dishes.length;
      const totalPages: number = Math.ceil(totalDishes / limit);
      const dishesReturn: Dish[] = this.dishes.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...dishesReturn],
        meta: {
          totalDishes: totalDishes,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Dish> {
    const dish: Dish = await this.findByTerm(term);
    if (!dish) {
      const errorText = getErrorMessage('E001');
      if (errorText) {
        throw new NotFoundException(errorText.replace('&', term));
      }
    }
    return dish;
  }

  async update(_id: string, updateDishDto: UpdateDishDto) {
    try {
      return await this.prisma.dish.update({
        where: { id: _id },
        data: updateDishDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.dish.delete({
        where: { id: _id },
      });
      return { message: `The dish with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<Dish> {
    const dish: Dish = isUUID(term)
      ? await this.prisma.dish.findFirst({
          where: { id: term },
        })
      : await this.prisma.dish.findFirst({
          where: {
            name: { equals: term, mode: 'insensitive' },
          },
        });
    return dish;
  }
}
