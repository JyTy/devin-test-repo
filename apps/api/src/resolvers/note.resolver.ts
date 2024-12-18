import { Mutation, Query, Resolver, Arg, ID, Int } from 'type-graphql';
import { Note, PaginatedNotes } from '../models/note.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Resolver(() => Note)
export class NoteResolver {
  @Query(() => PaginatedNotes)
  async notes(
    @Arg('skip', () => Int, { defaultValue: 0 }) skip: number,
    @Arg('take', () => Int, { defaultValue: 5 }) take: number
  ): Promise<PaginatedNotes> {
    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        orderBy: { created_datetime: 'desc' },
        skip,
        take,
      }),
      prisma.note.count(),
    ]);
    return { notes, total };
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
