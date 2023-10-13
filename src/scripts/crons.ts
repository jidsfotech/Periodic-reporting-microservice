import cron from 'node-cron';
import { connectMySQL, fetchUsers, fetchUserTransaction } from '../lib/mysql';
import { generatePDF } from '../lib/pdfGenerator';
import { sendEmail } from '../lib/mailer';
import { getLastDayOfTheMonth } from '../lib/utils';

// Send report at 11:pm daily
export const sendDailyReports = cron.schedule('0 23 * * *', async () => {
  // Get all users we want to send report to
  const users = await fetchUsers();

  for (const i in users) {
    const { id, email } = users[i];
    const transactions = await fetchUserTransaction(id);

    // Generate PDF for each user
    await generatePDF(transactions, 'daily-report');

    // Send email to user
    await sendEmail(email, './report.pdf', 'daily-report');
  }
});

// Send report at 12:am weekly
export const sendWeekReports = cron.schedule('0 0 * * 0', async () => {
  // Get all users we want to send report to
  const users = await fetchUsers();

  for (const i in users) {
    const { id, email } = users[i];
    const transactions = await fetchUserTransaction(id);

    // Generate PDF for each user
    await generatePDF(transactions, 'weekly-report');

    // Send email to user
    await sendEmail(email,'./report.pdf', 'weekly-report');
  }
});

// Send report every last day of the month at 11:pm
const lastDayOfMonth = getLastDayOfTheMonth();
export const sendMonthlyReports = cron.schedule(`0 23 ${lastDayOfMonth} * *`, async () => {
  // Get all users we want to send report to
  const users = await fetchUsers();

  for (const i in users) {
    const { id, email } = users[i];
    const transactions = await fetchUserTransaction(id);

    // Generate PDF for each user
    await generatePDF(transactions, 'monthly-report');

    // Send email to user
    await sendEmail(email, './report.pdf', 'monthly-report');
  }
});
