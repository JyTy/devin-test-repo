import { Field, ID, ObjectType, Int } from 'type-graphql';

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

@ObjectType()
export class PaginatedNotes {
  @Field(() => [Note])
  notes!: Note[];

  @Field(() => Int)
  total!: number;
}
