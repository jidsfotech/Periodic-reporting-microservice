import * as dotenv from 'dotenv';
dotenv.config();
import { Config } from './types/config.type';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
  NODEMAILER_SENDER,
} = process.env;

export const config: Config = {
  mysql: {
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    database: DATABASE_NAME,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
  },
  nodeMailerCred: {
    host: NODEMAILER_HOST,
    port: Number(NODEMAILER_PORT),
    secure: true, // use SSl
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASSWORD,
    },
    from: NODEMAILER_SENDER,
  },
};
