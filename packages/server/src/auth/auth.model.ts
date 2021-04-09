import { ArgsType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResult {
  accessToken?: string;
}

@ArgsType()
export class AuthArgs {
  username: string;
  password: string;
}
