import 'dotenv/config';

import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User }  from './schemas/User';

import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';

//Define db URL
const databaseURL = process.env.DATABASE_URL;

//Session config
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

//Auth method
const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in initial roles here
    }
});

//Create keystone instance
export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    //insert seed data on startup if there is no data
    async onConnect(keystone) {
      if (process.argv.includes('--seed-data')) {
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    //TODO: Schema items go in here
    User,
    Product,
    ProductImage,
  }),
  ui: {
    //Show the UI only for people who have a session and logged in
    isAccessAllowed: ({session}) => {
        // Return if there is a session and there is session.data
        // session?.data needs to return as a boolean so we use !! to convert it to a boolean
        return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    //GraphQL Query
    User: `id`,
  }),
}));
