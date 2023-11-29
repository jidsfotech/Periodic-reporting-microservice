import cron from 'node-cron';
import { getReportData } from '../lib/mysql';
import { getLastDayOfTheMonth, sendReport } from '../lib/utils';
import generateContent from '../lib/report.template';
import { IReportData } from '../types/types';
import { createAmqpConnection, publisher, consumer, createQueue } from '../lib/amqp';

// Send report  every minutes for developement tresting
export const sendEveryTwoMinuste = cron.schedule('* * * * *', async () => {
  // Establish amqp connection
  const { channel, connection } = await createAmqpConnection();
  // Create amqp exchange:"testReport" exchangeType:"direct" and queueName:"testReport.notifications"
  const queue = await createQueue(channel, 'testReport.notifications', 'testReport', 'direct');
  // get the report data
  const reportData: IReportData[] = await getReportData('minutes');

  for (let data of reportData) {
    const content: string = generateContent(data, 'Minutes');
    const { name, email } = data.user;
    const report = { content, email, reportType: 'minutes' };
    const jsonReport = JSON.stringify(report);
    // publish report
    await publisher(queue, jsonReport, name);
  }

  // consume report
  await consumer(queue, channel, connection);
});

// Send report at 11:pm daily
export const sendDailyReports = cron.schedule('0 23 * * *', async () => {
  // Establish amqp connection
  const { channel, connection } = await createAmqpConnection();
  // Create amqp exchange:"dailyReport" exchangeType:"direct" and queueName:"dailyReport.notifications"
  const queue = await createQueue(channel, 'dailyReport.notifications', 'dailyReport', 'direct');
  // get the report data
  const reportData: IReportData[] = await getReportData('daily');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Daily');
    const { name, email } = data.user;
    const report = { content, email, reportType: 'daily' };
    const jsonReport = JSON.stringify(report);
    // publish report
    await publisher(queue, jsonReport, name);
  }

  // consume report
  await consumer(queue, channel, connection);
});

// Send report at 12:am weekly
export const sendWeekReports = cron.schedule('0 0 * * 0', async () => {
  // Establish amqp connection
  const { channel, connection } = await createAmqpConnection();
  // Create amqp exchange:"weeklyReport" exchangeType:"direct" and queueName:"dailyReport.notifications"
  const queue = await createQueue(channel, 'weeklyReport.notifications', 'weeklyReport', 'direct');
  // get the report data
  const reportData: IReportData[] = await getReportData('weekly');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Weekly');
    const { name, email } = data.user;
    const report = { content, email, reportType: 'weekly' };
    const jsonReport = JSON.stringify(report);
    // publish report
    await publisher(queue, jsonReport, name);
  }

  // consume report
  await consumer(queue, channel, connection);
});

// Send report every last day of the month at 11:pm
const lastDayOfMonth = getLastDayOfTheMonth();
export const sendMonthlyReports = cron.schedule(`0 23 ${lastDayOfMonth} * *`, async () => {
  // Establish amqp connection
  const { channel, connection } = await createAmqpConnection();
  // Create amqp exchange:"monthlyReport" exchangeType:"direct" and queueName:"monthlyReport.notifications"
  const queue = await createQueue(channel, 'monthlyReport.notifications', 'monthlyReport', 'direct');
  // get the report data
  const reportData: IReportData[] = await getReportData('monthly');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Monthly');
    const { name, email } = data.user;
    const report = { content, email, reportType: 'monthly' };
    const jsonReport = JSON.stringify(report);
    // publish report
    await publisher(queue, jsonReport, name);
  }

  // consume report
  await consumer(queue, channel, connection);
});
