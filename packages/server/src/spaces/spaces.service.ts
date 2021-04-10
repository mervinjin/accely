import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpacesService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 创建空间，如果传入用户 id，会在创建空间后，将对应的用户加入该空间 */
  async create(name: string, userId?: number) {
    // TODO: 导入默认分类
    const space = await this.prismaService.space.create({ data: { name } });

    if (userId) {
      await this.addUser(space.id, userId);
    }

    return space;
  }

  /** 将用户添加到指定空间中 */
  async addUser(spaceId: number, userId: number) {
    return this.prismaService.spaceUser.create({ data: { userId, spaceId } });
  }

  /** 移除空间中的用户，如果移除后空间中没有用户了，则删除该空间 */
  async removeUser(spaceId: number, userId: number) {
    const spaceUserRecord = await this.prismaService.spaceUser.findFirst({
      where: { spaceId, userId },
    });

    if (!spaceUserRecord) {
      return;
    }

    const spaceUserCount = await this.prismaService.spaceUser.count({
      where: { spaceId },
    });

    const transactions: any[] = [
      this.prismaService.spaceUser.delete({
        where: { id: spaceUserRecord.id },
      }),
    ];

    if (spaceUserCount === 1) {
      transactions.push(
        this.prismaService.space.delete({ where: { id: spaceId } }),
      );
    }

    await this.prismaService.$transaction(transactions);
  }
}
