import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Delete,
  BadRequestException,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import ShortUniqueId from 'short-unique-id';

import * as wrapper from '@helpers/utils/wrapper';
import dayjs from '@helpers/utils/dayjs';
import { AccessTokenGuard } from '@guards/access-token.guards';
import { Response } from '@global/types/response.types';
import { RefreshTokenGuard } from '@guards/refresh-token.guards';
import { RequestUser } from '@global/types/request-user.types';
import { MailService } from '@global/services/mail/mail.service';

import { AuthsService } from './auths.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  LoginByTokenResponse,
  LoginResponse,
  RegisterResponse,
  RenewAccessTokenResponse,
} from './types/auths.response';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgotPassDto } from './dto/forgot-password.dto';
import { VerifyForgotPassDto } from './dto/verify-forgot-password.dto';
import { ConfirmForgotPassDto } from './dto/confirm-forgot-password.dto';

@ApiTags('auths')
@Controller('v1/auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post()
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
  ): Promise<Response<RegisterResponse>> {
    const { username, email, password } = registerAuthDto;

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(this.configService.get('SALT_ROUND')),
    );

    const { id } = await this.authsService.register({
      username,
      email,
      password: hashedPassword,
    });

    return wrapper.response<RegisterResponse>({
      data: { id, username, email },
      message: 'Register Success',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<Response<LoginResponse>> {
    const { identifier, password } = loginAuthDto;
    const result = await this.authsService.findOne({
      email: identifier,
      username: identifier,
    });

    if (!result) {
      throw new UnauthorizedException('Credentials Failed');
    }

    const valid = await bcrypt.compare(password, result.password);

    if (!valid) {
      throw new UnauthorizedException('Credentials Failed.');
    }

    const access_token = jwt.sign(
      { id: result.id },
      this.configService.get('ACCESS_TOKEN_KEY'),
      { expiresIn: '1d' },
    );
    const refresh_token = jwt.sign(
      { id: result.id },
      this.configService.get('REFRESH_TOKEN_KEY'),
      { expiresIn: '7d' },
    );

    await this.authsService.saveRefreshToken(refresh_token);

    const userData = {
      ...result,
      password: undefined,
    };
    return wrapper.response<LoginResponse>({
      data: { ...userData, access_token, refresh_token },
      message: 'Login Success',
    });
  }

  @Get('login/token')
  @UseGuards(AccessTokenGuard)
  async loginByToken(
    @Request() req: RequestUser,
  ): Promise<Response<LoginByTokenResponse>> {
    const { id, username, email, profile_img } =
      await this.authsService.findOne({
        id: req.user.id,
      });

    return wrapper.response<LoginByTokenResponse>({
      data: {
        id,
        username,
        email,
        profile_img,
      },
      message: 'Login By Token Success',
    });
  }

  @Get('renew-token')
  @UseGuards(RefreshTokenGuard)
  async renewAccessToken(
    @Request() req: RequestUser,
  ): Promise<Response<RenewAccessTokenResponse>> {
    const foundedToken = await this.authsService.findRefreshToken(req.token);

    if (!foundedToken) {
      throw new UnauthorizedException("Token doesn't valid");
    }

    const result = await this.authsService.findOne({
      id: req.user.id,
    });

    if (!result) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const access_token = jwt.sign(
      { id: req.user.id },
      this.configService.get('ACCESS_TOKEN_KEY'),
    );

    return wrapper.response<RenewAccessTokenResponse>({
      data: {
        access_token,
      },
      message: 'Renew Token Success',
    });
  }

  @Delete('logout')
  @UseGuards(RefreshTokenGuard)
  async logout(@Request() req: RequestUser): Promise<Response> {
    const foundedToken = await this.authsService.findRefreshToken(req.token);

    if (!foundedToken) {
      throw new UnauthorizedException("Token doesn't valid");
    }

    await this.authsService.deleteRefreshToken(req.token);

    return wrapper.response({ message: 'Logout Success' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot')
  async forgotPassword(
    @Body() forgotPassDto: ForgotPassDto,
  ): Promise<Response> {
    const { email } = forgotPassDto;
    const result = await this.authsService.findOne({
      email,
    });

    if (!result) {
      throw new NotFoundException("Email doesn't exist");
    }

    const { randomUUID } = new ShortUniqueId({ length: 5 });
    const token = randomUUID();

    await this.authsService.saveForgotToken({
      token,
      user_id: result.id,
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Confirm your forgot password',
      content: `Here is your token: ${token}.`,
    });

    return wrapper.response({ message: 'Request already sent to mail' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot/verification')
  async verifyForgotPassword(
    @Body() verifyForgotPassDto: VerifyForgotPassDto,
  ): Promise<Response> {
    const { email, token } = verifyForgotPassDto;

    const user = await this.authsService.findOne({ email });

    if (!user) {
      throw new BadRequestException("Token or Email doesn't valid");
    }

    const result = await this.authsService.verifyForgotToken({
      user_id: user.id,
      token,
    });

    if (!result) {
      throw new BadRequestException("Token or Email doesn't valid");
    }

    const { created_at } = result;
    const currentDiff = dayjs.utc().diff(dayjs.utc(created_at), 'minute');

    if (
      currentDiff >
      parseInt(
        this.configService.get('FORGOT_PASSWORD_TOKEN_EXPIRES_IN_MINUTES'),
      )
    ) {
      throw new ForbiddenException('Token expired.');
    }

    return wrapper.response({
      message: 'Verify Forgot Password Success',
    });
  }

  @Put('forgot/confirmation')
  async confirmForgotPassword(
    @Body() confirmForgotPassDto: ConfirmForgotPassDto,
  ): Promise<Response<string>> {
    const { email, token, new_password } = confirmForgotPassDto;

    const user = await this.authsService.findOne({ email });

    if (!user) {
      throw new BadRequestException("Token or Email doesn't valid");
    }

    const result = await this.authsService.verifyForgotToken({
      user_id: user.id,
      token,
    });

    if (!result) {
      throw new BadRequestException("Token or Email doesn't valid");
    }

    const { created_at } = result;
    const currentDiff = dayjs.utc().diff(dayjs.utc(created_at), 'minute');

    if (
      currentDiff >
      parseInt(
        this.configService.get('FORGOT_PASSWORD_TOKEN_EXPIRES_IN_MINUTES'),
      )
    ) {
      throw new ForbiddenException('Token expired.');
    }

    const hashedPassword = await bcrypt.hash(
      new_password,
      parseInt(this.configService.get('SALT_ROUND')),
    );

    await this.authsService.updatePassword(user.id, hashedPassword);
    await this.authsService.deleteForgotToken(token);

    return wrapper.response({
      data: 'Password successfully updated',
      message: 'Confirm Password Success',
    });
  }
}
