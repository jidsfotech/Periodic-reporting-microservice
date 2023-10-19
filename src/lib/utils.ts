import moment from 'moment';
import * as fs from 'fs';
import { generatePDF } from './pdfGenerator';
import { sendEmail } from './mailer';
import { IReportData } from '../types/types';

export const deletePdfFile = (file: string): void => {
  try {
    fs.stat(file, (error, stats) => {
      if (error) throw error;
      fs.unlink(file, (error) => {
        if (error) throw error;
        console.log(`file deleted successfully:--`, file);
      });
    });
  } catch (err) {
    console.error('Error occured while deleting file', err);
    throw err;
  }
};

export const getLastDayOfTheMonth = (): string => {
  const now = moment();
  const currentYear = now.year();
  const currentMonth = now.month();
  return moment([currentYear, currentMonth]).endOf('month').format('D');
};

export const sendReport = async (content: string, email: string, type: string): Promise<void> => {
  try {
    // Generate PDF for each user
    await generatePDF(content, `${type}-report`);

    // Send email to user
    const path: string = `${__dirname}/../reports/${type}-report.pdf`;
    await sendEmail(email, path, `${type}-report`);

    // delete pdf after sending to user
    deletePdfFile(path);
  } catch (error) {
    console.log(error);
  }
};
