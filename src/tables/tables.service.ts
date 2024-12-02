import { Injectable, NotFoundException } from '@nestjs/common';
import { Table } from '@prisma/client';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { handleDbExceptions } from 'src/common/helpers';
import { PrismaService } from 'src/middlewares';
import { PaginationDto } from 'src/common/dto';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { isUUID } from 'class-validator';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}
  private tables: Table[] = []; //TODO: Refactor handle cache

  async create(createTableDto: CreateTableDto): Promise<CreateTableDto> {
    try {
      return await this.prisma.table.create({
        data: createTableDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.tables = await this.prisma.table.findMany({
        include: {
          orderBills: true,
        },
      });
      const totalTables: number = this.tables.length;
      const totalPages: number = Math.ceil(totalTables / limit);
      const tablesReturn: Table[] = this.tables.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...tablesReturn],
        meta: {
          totalTables: totalTables,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Table> {
    const table: Table = await this.findByTerm(term);
    if (!table) {
      const errorText = getErrorMessage('E001');
      throw new NotFoundException(errorText.replace('&', term));
    }
    return table;
  }

  async update(_id: string, updateTableDto: UpdateTableDto) {
    try {
      return await this.prisma.table.update({
        where: { id: _id },
        data: updateTableDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.table.delete({
        where: { id: _id },
      });
      return { message: `The table with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<Table> {
    const bool: boolean = isUUID(term);
    if (bool) {
      const table: Table = await this.prisma.table.findFirst({
        where: { id: term },
        include: {
          orderBills: true,
        },
      });
      return table;
    } else {
      const tableNumber = Number(term);
      const table: Table = await this.prisma.table.findFirst({
        where: {
          tableNumber: tableNumber,
        },
        include: {
          orderBills: true,
        },
      });
      return table;
    }
  }
}
