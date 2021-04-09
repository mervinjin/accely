import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserArgs } from './users.model';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: CreateUserArgs) {
    return this.prismaService.user.create({ data: args });
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByUsername(username: string) {
    return this.prismaService.user.findFirst({ where: { username } });
  }
}
