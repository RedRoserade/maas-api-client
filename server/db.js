import { db as dbConfig } from '../config';

import pgp from 'pg-promise';
const db = pgp()(dbConfig);

export default db;
