import { Field, ID, ObjectType } from 'type-graphql';
import { Note } from './note.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  email!: string;

  // Password is not exposed in GraphQL schema
  password!: string;

  @Field(() => Boolean)
  isVerified!: boolean;

  @Field(() => String, { nullable: true })
  verifyToken?: string | null;

  @Field(() => [Note])
  notes!: Note[];

  @Field(() => Date)
  created_datetime!: Date;
}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}
