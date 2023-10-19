import cron from 'node-cron';
import { getReportData } from '../lib/mysql';
import { getLastDayOfTheMonth, sendReport } from '../lib/utils';
import generateContent from '../lib/report.template';
import { IReportData } from '../types/types';

export const sendEveryTwoMinuste = cron.schedule('* * * * *', async () => {
  const reportData: IReportData[] = await getReportData('minutes');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Minutes');
    const { email } = data.user;
    await sendReport(content, email, 'minutes');
  }
});

// // Send report at 11:pm daily
export const sendDailyReports = cron.schedule('0 23 * * *', async () => {
  const reportData: IReportData[] = await getReportData('daily');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Daily');
    const { email } = data.user;
    await sendReport(content, email, 'Daily');
  }
});

// // Send report at 12:am weekly
export const sendWeekReports = cron.schedule('0 0 * * 0', async () => {
  const reportData: IReportData[] = await getReportData('weekly');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Weekly');
    const { email } = data.user;
    await sendReport(content, email, 'weekly');
  }
});

// // Send report every last day of the month at 11:pm
const lastDayOfMonth = getLastDayOfTheMonth();
export const sendMonthlyReports = cron.schedule(`0 23 ${lastDayOfMonth} * *`, async () => {
  const reportData: IReportData[] = await getReportData('monthly');
  for (let data of reportData) {
    const content: string = generateContent(data, 'Monthly');
    const { email } = data.user;
    await sendReport(content, email, 'monthly');
  }
});
