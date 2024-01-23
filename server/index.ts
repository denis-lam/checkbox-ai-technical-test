import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { resolvers } from '@generated/type-graphql';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

(async () => {
  const port = Number(process.env.SERVER_PORT);

  if (isNaN(port)) {
    throw new Error('Please ensure that SERVER_PORT is correctly configured in your .env file');
  }

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    stopOnTerminationSignals: true,
  });

  const prisma = new PrismaClient();

  const { url } = await startStandaloneServer(apolloServer, {
    context: async (): Promise<Context> => ({
      prisma,
    }),
    listen: {
      port,
    },
  });

  console.log(`Apollo server started on ${url}...`);
})();
