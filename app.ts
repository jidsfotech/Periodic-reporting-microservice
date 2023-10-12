import { connectMySQL } from './src/lib/mysql';
import moment from 'moment';
import { sendDailyReports, sendWeekReports, sendMonthlyReports } from './src/scripts/crons';

export const runTasks = async () => {
  console.log(`Scripts started running at:- ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`);

  // Connect to MySQL database
  await connectMySQL();

  // send report daily
  sendDailyReports.start();

  // send report weekly
  sendWeekReports.start();

  // send report monthly
  sendMonthlyReports.start();
};

runTasks();
