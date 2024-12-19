import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  email!: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}
