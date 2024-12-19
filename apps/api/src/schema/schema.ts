import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { HealthResolver } from '../resolvers/health.resolver';
import { NoteResolver } from '../resolvers/note.resolver';
import { AuthResolver } from '../resolvers/auth.resolver';
import { VerifyResolver } from '../resolvers/verify.resolver';

export const createSchema = async () => {
  const schema = await buildSchema({
    resolvers: [HealthResolver, NoteResolver, AuthResolver, VerifyResolver],
    emitSchemaFile: true,
    validate: false,
  });
  return schema;
};
