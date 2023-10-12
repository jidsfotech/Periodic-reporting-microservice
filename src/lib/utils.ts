import moment from 'moment';
import * as fs from 'fs';

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

export const getLastDayOfTheMonth = () => {
  const now = moment();
  const currentYear = now.year();
  const currentMonth = now.month();
  return moment([currentYear, currentMonth]).endOf('month').format('D');
};
