import { Mutation, Query, Resolver, Arg, ID } from 'type-graphql';
import { Note } from '../models/note.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Resolver(() => Note)
export class NoteResolver {
  @Query(() => [Note])
  async notes(): Promise<Note[]> {
    return prisma.note.findMany({
      orderBy: {
        created_datetime: 'desc'
      }
    });
  }

  @Query(() => Note, { nullable: true })
  async note(@Arg('id', () => ID) id: string): Promise<Note | null> {
    return prisma.note.findUnique({
      where: { id: parseInt(id) }
    });
  }

  @Mutation(() => Note)
  async createNote(
    @Arg('text', () => String) text: string,
    @Arg('title', () => String, { nullable: true }) title?: string
  ): Promise<Note> {
    return prisma.note.create({ data: { title, text } });
  }
}
