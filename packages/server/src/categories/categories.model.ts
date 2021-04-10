import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Category as ICategory,
  DefaultCategory as IDefaultCategory,
} from '@prisma/client';

@ObjectType()
export class DefaultCategory implements Partial<IDefaultCategory> {
  @Field(() => ID)
  id: number;
  parentId?: number;
  name: string;
  updateAt: Date;
}

@ObjectType()
export class Category extends DefaultCategory implements Partial<ICategory> {
  spaceId: number;
}

@ObjectType()
export class DefaultCategoryTree {
  id: number;
  name: string;
  parentId?: number;
  children: DefaultCategoryTree[];
  updateAt: Date;
}

@ObjectType()
export class CategoryTree extends DefaultCategoryTree {
  spaceId?: string;
}
