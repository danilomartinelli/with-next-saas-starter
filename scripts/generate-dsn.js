const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const { POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_DB } = process.env;

const dsn = `postgresql://postgres:${POSTGRES_PASSWORD}@127.0.0.1:${POSTGRES_PORT}/${POSTGRES_DB}`;

console.log(dsn);
