import { Field, ID, ObjectType, ArgsType } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: number;
  username: string;
  password: string;
  updateAt: Date;
}

@ArgsType()
export class CreateUserArgs {
  username: string;
  password: string;
  nickname: string;
}
