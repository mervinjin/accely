import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Category,
  CategoryTree,
  DefaultCategory,
  DefaultCategoryTree,
} from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  /** 生成树形结构 */
  getTreeData<T extends DefaultCategory>(
    categories: T[],
    childrenMap = new Map<number, T[]>(),
  ): T extends Category ? CategoryTree[] : DefaultCategoryTree[] {
    if (categories.length === 0) {
      return [];
    }

    /** 第一次进入递归，初始化层级关系，并对根节点进行递归 */
    if (childrenMap.size === 0) {
      for (const category of categories) {
        const { id, parentId } = category;
        if (!childrenMap.has(id)) {
          childrenMap.set(id, []);
        }
        if (!parentId) {
          return;
        }
        if (!childrenMap.has(parentId)) {
          childrenMap.set(parentId, []);
        }

        const sibling = childrenMap.get(parentId);
        sibling.push({
          ...category,
        });
      }

      return categories
        .filter((category) => category.parentId === null)
        .map((category) => ({
          ...category,
          children: this.getTreeData(childrenMap.get(category.id), childrenMap),
        }));
    }

    return categories.map((category) => ({
      ...category,
      children: this.getTreeData(childrenMap.get(category.id), childrenMap),
    }));
  }

  async init(spaceId: number) {
    const defaultCategories = await this.prismaService.defaultCategory.findMany();
    const existCategories = await this.prismaService.category.findMany();
    const treeData = this.getTreeData(defaultCategories);
    // 创建时起始 id 的值为当前最新的 id + 100
    const startId = existCategories.pop().id + 100;
    const queue = [...treeData];
    const parentIdMap = new Map<number, number>();
    const categoryList: Omit<DefaultCategory, 'id'>[] = [];

    // TODO: 生成 categoryList
  }
}
