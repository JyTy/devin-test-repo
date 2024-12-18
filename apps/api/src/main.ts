import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createSchema } from './schema/schema';
import cors from 'cors';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const bootstrap = async () => {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    },
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        req,
      };
    },
  }));

  app.listen(port, host, () => {
    console.log(`[ ready ] GraphQL API running at http://${host}:${port}/graphql`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
