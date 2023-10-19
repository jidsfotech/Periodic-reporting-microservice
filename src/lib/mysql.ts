import { createConnection, Connection, ResultSetHeader } from 'mysql2/promise';
import { config } from '../config';
import { MysqlCred } from '../types/config.type';
import dummyData from '../dummData';
import { IReportData } from '../types/types';

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

export const fetchUsers = async (): Promise<ResultSetHeader> => {
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows as ResultSetHeader;
  } catch (E) {
    console.log(E);
  }
};

export const fetchUserTransaction = async (userId: number): Promise<ResultSetHeader> => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT * FROM transaction_logs WHERE ${userId} = transaction_logs.user_id`,
    );
    return rows as ResultSetHeader;
  } catch (E) {
    console.log(E);
  }
};

export const getReportData = async (type: string): Promise<IReportData[]> => {
  // Get all users we want to send report to
  const users = await fetchUsers();
  let data: IReportData[];
  // for (let i in users) {
  //   const { id } = users[i];
  //   let userTransactions = await fetchUserTransaction(id);
  //   data.push({ transactions: userTransactions, user: user[i] })
  // }

  // return dummy data for testing
  return dummyData;
};
