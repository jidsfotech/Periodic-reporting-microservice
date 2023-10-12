import PDFDocument from 'pdfkit';
import * as fs from 'fs';

function generateHeader(doc) {
  doc
    .image('../../public/logo.png', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Jidsfotech.', 110, 57)
    .fontSize(10)
    .text('123 Main Street', 200, 65, { align: 'right' })
    .text('Ilorin, Kwara, 10025', 200, 80, { align: 'right' })
    .moveDown();
}

function generateFooter(doc) {
  doc.fontSize(10).text('Jidsfotech transaction report', 50, 780, { align: 'center', width: 500 });
}
const generatePDF = async (content: [{ [key: string]: string }], docName: string) => {
  const doc = new PDFDocument({ margin: 50 });
  generateHeader(doc);
  generateFooter(doc);
  doc.end();
};

export { generatePDF };
