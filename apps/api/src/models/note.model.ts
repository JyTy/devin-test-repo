import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Note {
  @Field(() => ID)
  id!: number;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String)
  text!: string;

  @Field(() => Date)
  created_datetime!: Date;

  @Field(() => Date)
  updated_datetime!: Date;
}
