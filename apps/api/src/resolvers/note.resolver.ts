import { Mutation, Query, Resolver, Arg } from 'type-graphql';
import { Note } from '../models/note.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Resolver(() => Note)
export class NoteResolver {
  @Query(() => [Note])
  async notes(): Promise<Note[]> {
    return prisma.note.findMany();
  }

  @Mutation(() => Note)
  async createNote(
    @Arg('text', () => String) text: string
  ): Promise<Note> {
    return prisma.note.create({ data: { text } });
  }
}
