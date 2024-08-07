import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationResponse, Response } from '@global/types/response.types';
import * as wrapper from '@helpers/utils/wrapper';
import { AccessTokenGuard } from '@guards/access-token.guards';
import { RequestUser } from '@global/types/request-user.types';
import { AuthsService } from '@modules/auths/auths.service';
import { RefreshTokenGuard } from '@guards/refresh-token.guards';

import { UsersService } from './users.service';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthsService,
  ) {}

  @Get()
  async findAll(
    @Query() findUsersDto: FindUsersDto,
  ): Promise<PaginationResponse<User[]>> {
    const { row, page, search_value, search_key } = findUsersDto;
    const search =
      search_key !== null && search_value !== null
        ? { [search_key]: search_value }
        : null;
    const { data: users, count } = await this.usersService.findAll({
      row,
      page,
      search,
    });

    return wrapper.paginationResponse<User[]>({
      data: users,
      message: 'Find Users Success',
      meta: {
        totalData: count,
        totalPage: Math.ceil(count / row) | 0,
        totalView: users.length,
        currentPage: page,
        maxView: row,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Response<User>> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return wrapper.response({
      data: user,
      message: 'Find User By Id Success',
    });
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  async update(
    @Request() req: RequestUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    const updatedUser = await this.usersService.update(
      req.user.id,
      updateUserDto,
    );

    return wrapper.response({
      data: updatedUser,
      message: 'Update User Successd',
    });
  }

  @Delete()
  @UseGuards(RefreshTokenGuard)
  async remove(@Request() request: RequestUser): Promise<Response> {
    await this.authsService.deleteRefreshToken(request.token);
    await this.usersService.remove(request.user.id);

    return wrapper.response({
      message: 'Delete User Success',
    });
  }
}
