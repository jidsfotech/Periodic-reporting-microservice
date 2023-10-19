import { IReportData, ITransaction } from '../types/types';
import moment from 'moment';

export default (data: IReportData, type: string): string => {
  const rows = generateRows(data.transactions);
  const today = moment();
  const { email, address, company } = data.user;
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Transaction report</title>
  </head>
  
  <div style="display:flex; flex-direction: column; gap: 3px; padding: 2px;">
      <div>Company: ${company}</div>
      <div>Email: ${email}</div>
      <div>Date: ${today}</div>
      <div>Address: ${address}</div>
  </div>
  
  <body>
      <table style="padding: 5px;">
          <th style="background: greenyellow; border-radius: 3px; padding:3px">
              <tr>
                  <td class="cell">
                      Product
                  </td>
                  <td class="cell">
                      Unit Price
                  </td>
                  <td class="cell">
                      Quantity
                  </td>
                  <td class="cell">
                      Date Sold
                  </td>
                  <td class="cell">
                      Status
                  </td>
              </tr>
          </th>
          <tbody style="">
            ${rows}
          </tbody>
      </table>
  </body>
  
  </html>
  `;
  return template;
};

const generateRows = (tranData: ITransaction[]): string => {
  let rows: string = '';
  for (let data of tranData) {
    const { product, price, quantity, date, status } = data;
    let row = `
    <tr class="row" style="padding:3px">
                <td class="cell" data-title="Product">
                    ${product}
                </td>
                <td class="cell" data-title="Unit Price">
                    ${price}
                </td>
                <td class="cell" data-title="Quantity">
                    ${quantity}
                </td>
                <td class="cell" data-title="Date Sold">
                    ${date}
                </td>
                <td class="cell" data-title="Status">
                    ${status}
                </td>
            </tr>
    `;
    row = row.replace(/[`]+/g, '');
    rows = rows.concat(' ', row);
  }

  return rows;
};
