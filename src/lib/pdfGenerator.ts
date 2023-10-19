import puppeteer from 'puppeteer';

const generatePDF = async (content: string, docName: string) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(content);

    const path: string = `${__dirname}/../reports/${docName}.pdf`;
    await page.pdf({ path: path, format: 'A4' });

    await browser.close();
  } catch (error) {
    console.log('Error while create pdf:-', error);
  }
};

export { generatePDF };
