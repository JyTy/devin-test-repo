import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createSchema } from './schema/schema';
import cors from 'cors';

// Allow all hosts in deployment
const host = '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const bootstrap = async () => {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // Configure CORS to accept all origins in development/testing
  app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  app.listen(port, host, () => {
    console.log(`[ ready ] GraphQL API running at http://${host}:${port}/graphql`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
