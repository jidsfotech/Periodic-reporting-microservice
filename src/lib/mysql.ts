import { createConnection, Connection } from 'mysql2/promise';
import { config } from '../config';
import { MysqlCred } from '../types/config.type';

const { port, host, user, password, database } = config.mysql;
const connectionConfig: MysqlCred = {
  port: port,
  host: host,
  user: user,
  password: password,
  database: database,
};
let connection: Connection;

export const connectMySQL = async (): Promise<Connection> => {
  try {
    connection = await createConnection(connectionConfig);
    console.log('Connected to database successfully');
    return connection;
  } catch (error) {
    console.log('Fail to connect to databse');
  }
};

export const fetchUsers = async () => {
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows;
  } catch (E) {
    console.log(E);
  }
};

export const fetchUserTransaction = async (userId: number) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT * FROM transaction_logs WHERE ${userId} = transaction_logs.user_id`,
    );
    return rows;
  } catch (E) {
    console.log(E);
  }
};
