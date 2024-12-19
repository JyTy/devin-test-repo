import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createSchema } from './schema/schema';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
      const auth = req.headers.authorization || '';
      if (auth) {
        try {
          const token = auth.split('Bearer ')[1];
          const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
          const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
          });
          return { req, user };
        } catch (e) {
          console.error('Auth error:', e);
        }
      }
      return { req, user: null };
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
