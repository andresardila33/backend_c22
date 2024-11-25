import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/middlewares/prisma-service';
import { CreateDishDto, UpdateDishDto } from './dto';
import { PaginationDto } from 'src/common/dto';
import { handleDbExceptions } from 'src/common/helpers';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { isUUID } from 'class-validator';
import { Dish } from '@prisma/client';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}
  private dishes: Dish[] = []; //TODO: Refactor handle cache

  async create(createDishDto: CreateDishDto) {
    try {
      const { images, ...restProps } = createDishDto;
      const dish = await this.prisma.dish.create({
        data: { ...restProps },
      });

      images.map(async (image) => {
        await this.prisma.dishImage.create({
          data: {
            imgUrl: image,
            dishId: dish.id,
          },
        });
      });
      return {
        data: [
          {
            ...dish,
            dishImages: [...images],
          },
        ],
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.dishes = await this.prisma.dish.findMany({
        include: {
          dishImages: {
            omit: {
              id: true,
              dishId: true,
            },
          },
        },
      });
      const totalDishes: number = this.dishes.length;
      const totalPages: number = Math.ceil(totalDishes / limit);
      const dishesReturn = this.dishes.slice(
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
      throw new NotFoundException(errorText.replace('&', term));
    }
    return dish;
  }

  async update(_id: string, updateDishDto: UpdateDishDto) {
    try {
      const { images = [], ...restProps } = updateDishDto;
      const dishUpdate = await this.prisma.dish.update({
        where: { id: _id },
        data: {
          ...restProps,
          dishImages: {
            deleteMany: {},
          },
        },
      });
      if (dishUpdate) {
        images.map(async (image) => {
          await this.prisma.dishImage.create({
            data: {
              imgUrl: image,
              dishId: dishUpdate.id,
            },
          });
        });
      }
      return {
        data: [{ dishUpdate, dishImages: [...images] }],
      };
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
          include: {
            dishImages: {
              omit: { id: true, dishId: true },
            },
          },
        })
      : await this.prisma.dish.findFirst({
          where: {
            dishName: { equals: term, mode: 'insensitive' },
          },
          include: {
            dishImages: {
              omit: { id: true, dishId: true },
            },
          },
        });
    return dish;
  }
}
