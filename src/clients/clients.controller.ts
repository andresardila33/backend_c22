import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import { PaginationDto } from 'src/common/dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Post()
  createUser(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientsService.findAll(paginationDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.clientsService.findOne(term);
  }

  @HttpCode(201)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.remove(id);
  }
}
