import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './api/schema.js';
import connDB from './database/connDB.js';

const app = express();

connDB();

app.all('/users', createHandler({ schema }));

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
