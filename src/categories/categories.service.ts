import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { handleDbExceptions } from 'src/common/helpers';
import { PrismaService } from 'src/middlewares';
import { PaginationDto } from 'src/common/dto';
import { isUUID } from 'class-validator';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  private categories: Category[] = []; //TODO: Refactor handle cache

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.categories = await this.prisma.category.findMany({
        include: {
          dishes: { include: { dishImages: true } },
        },
      });
      const totalCategories: number = this.categories.length;
      const totalPages: number = Math.ceil(totalCategories / limit);
      const categoriesReturn: Category[] = this.categories.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...categoriesReturn],
        meta: {
          totalCategories: totalCategories,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Category> {
    const category: Category = await this.findByTerm(term);
    if (!category) {
      const errorText = getErrorMessage('E001');
      throw new NotFoundException(errorText.replace('&', term));
    }
    return category;
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id: _id },
        data: updateCategoryDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.category.delete({
        where: { id: _id },
      });
      return { message: `The category with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<Category> {
    const category: Category = isUUID(term)
      ? await this.prisma.category.findFirst({
          where: { id: term },
          include: {
            dishes: { include: { dishImages: true } },
          },
        })
      : await this.prisma.category.findFirst({
          where: {
            categoryName: { equals: term, mode: 'insensitive' },
          },
          include: {
            dishes: { include: { dishImages: true } },
          },
        });
    return category;
  }
}
