import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { HealthResolver } from '../resolvers/health.resolver';
import { NoteResolver } from '../resolvers/note.resolver';

export const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [HealthResolver, NoteResolver],
    emitSchemaFile: true,
    validate: false,
  });
  return schema;
};
