import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: number;
  name: string;
  email: string;
  password: string;
  updateAt: Date;
}
