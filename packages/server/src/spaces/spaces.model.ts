import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Space as ISpace } from '@prisma/client';

@ObjectType()
export class Space implements ISpace {
  @Field(() => ID)
  id: number;
  name: string;
  updateAt: Date;
}
