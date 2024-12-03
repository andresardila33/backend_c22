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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiBody({
    required: true,
    description: 'Client data',
    schema: {
      example: {
        firstName: 'Miguel',
        lastName: 'Cabrera',
        userName: 'miguecabra',
        phone: '123-456-7890',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    schema: {
      example: {
        id: '119a11e8-6692-4eda-81cf-ab59585e0070',
        firstName: 'Miguel',
        lastName: 'Cabrera',
        userName: 'miguecabra',
        phone: '123-456-7890',
        createAt: '2024-12-01T18:00:32.061Z',
        updatedAt: '2024-12-01T18:00:32.061Z',
      },
    },
  })
  @Post()
  createUser(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @HttpCode(200)
  @ApiOperation({summary: 'Get all clients'})
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientsService.findAll(paginationDto);
  }

  @HttpCode(200)
  @ApiOperation({summary: 'Get one client by id'})
  @ApiParam({name: 'term', type: 'string', description: 'Insert client id'})
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
