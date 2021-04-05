import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthArgs, CreateUserArgs } from './users.model';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  auth(args: AuthArgs) {
    return this.prismaService.user.findFirst({
      where: args,
    });
  }

  create(args: CreateUserArgs) {
    return this.prismaService.user.create({ data: args });
  }

  get(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
