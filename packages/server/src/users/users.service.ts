import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
