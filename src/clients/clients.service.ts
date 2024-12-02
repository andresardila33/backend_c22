import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto';
import { PrismaService } from 'src/middlewares';
import { handleDbExceptions } from 'src/common/helpers';
import { PaginationDto } from 'src/common/dto';
import { Client } from '@prisma/client';
import { getErrorMessage } from 'src/common/messages/error_messages';
import { isUUID } from 'class-validator';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}
  private clients: Client[] = []; //TODO: Refactor handle cache
  async create(createClientDto: CreateClientDto): Promise<CreateClientDto> {
    try {
      return await this.prisma.client.create({
        data: createClientDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      this.clients = await this.prisma.client.findMany({
        include: {
          orderBills: true,
        },
      });
      const totalClients: number = this.clients.length;
      const totalPages: number = Math.ceil(totalClients / limit);
      const clientsReturn: Client[] = this.clients.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit,
      );
      return {
        data: [...clientsReturn],
        meta: {
          totalClients: totalClients,
          totalPages: totalPages,
          page: page,
        },
      };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async findOne(term: string): Promise<Client> {
    const client: Client = await this.findByTerm(term);
    if (!client) {
      const errorText = getErrorMessage('E001');
      throw new NotFoundException(errorText.replace('&', term));
    }
    return client;
  }

  async update(_id: string, updateClientDto: UpdateClientDto) {
    try {
      return await this.prisma.client.update({
        where: { id: _id },
        data: updateClientDto,
      });
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  async remove(_id: string) {
    try {
      await this.prisma.client.delete({
        where: { id: _id },
      });
      return { message: `The client with id: "${_id}" was deleted` };
    } catch (error) {
      handleDbExceptions(error);
    }
  }

  private async findByTerm(term: string): Promise<Client> {
    const client: Client = isUUID(term)
      ? await this.prisma.client.findFirst({
          where: { id: term },
          include: {
            orderBills: true,
          },
        })
      : await this.prisma.client.findFirst({
          where: {
            userName: { equals: term, mode: 'insensitive' },
          },
          include: {
            orderBills: true,
          },
        });
    return client;
  }
}
