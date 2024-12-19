import { Mutation, Query, Resolver, Arg, ID, Int, Ctx } from 'type-graphql';
import { Note, PaginatedNotes } from '../models/note.model';
import { PrismaClient } from '@prisma/client';
import { Context } from '../types/context';

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
        select: {
          id: true,
          title: true,
          created_datetime: true
        }
      }),
      prisma.note.count(),
    ]);
    return { notes, total };
  }

  @Query(() => Note, { nullable: true })
  async note(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id) }
    });

    if (!ctx.user && note) {
      return {
        ...note,
        text: 'Please login to view the full note'
      };
    }

    return note;
  }

  @Mutation(() => Note)
  async createNote(
    @Arg('text', () => String) text: string,
    @Ctx() ctx: Context,
    @Arg('title', () => String, { nullable: true }) title?: string
  ): Promise<Note> {
    if (!ctx.user) throw new Error('Must be authenticated');
    return prisma.note.create({
      data: {
        title,
        text,
        authorId: ctx.user.id
      }
    });
  }
}
