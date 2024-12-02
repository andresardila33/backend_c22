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
import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles';
import { PaginationDto } from 'src/common/dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Post()
  createUser(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user, ValidRoles.chef)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tablesService.findAll(paginationDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager, ValidRoles.waiter, ValidRoles.user, ValidRoles.chef)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.tablesService.findOne(term);
  }

  @HttpCode(201)
  @Auth(ValidRoles.manager, ValidRoles.waiter)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTabletDto: UpdateTableDto,
  ) {
    return this.tablesService.update(id, updateTabletDto);
  }

  @HttpCode(200)
  @Auth(ValidRoles.manager)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tablesService.remove(id);
  }
}
